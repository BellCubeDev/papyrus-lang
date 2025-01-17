import { inject, injectable, interfaces } from 'inversify';
import { ILanguageClient } from './LanguageClient';
import { PapyrusGame, getGames } from '../PapyrusGame';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { IExtensionConfigProvider, IGameConfig } from '../ExtensionConfigProvider';
import { map, take } from 'rxjs/operators';
import { asyncDisposable } from '../common/Reactive';
import { Disposable, CancellationTokenSource, CancellationToken } from 'vscode';
import fastDeepEqual from 'fast-deep-equal';
import { ILanguageClientHost, LanguageClientHost, ClientHostStatus } from './LanguageClientHost';
import { ICreationKitInfoProvider, ICreationKitInfo } from '../CreationKitInfoProvider';
import { IPathResolver } from '../common/PathResolver';

export interface ILanguageClientManager extends Disposable {
    readonly clients: ReadonlyMap<PapyrusGame, Observable<ILanguageClientHost>>;
    getActiveLanguageClients(cancellationToken?: CancellationToken): Promise<ILanguageClientHost[]>;
    getLanguageClientHost(game: PapyrusGame): Promise<ILanguageClientHost>;
    getLanguageClient(game: PapyrusGame): Promise<ILanguageClient | null>;
}

@injectable()
export class LanguageClientManager implements Disposable, ILanguageClientManager {
    private readonly _clients: ReadonlyMap<PapyrusGame, Observable<ILanguageClientHost>>;

    private readonly _clientSubscriptions: Subscription[];

    constructor(
        @inject(IExtensionConfigProvider) configProvider: IExtensionConfigProvider,
        @inject(ICreationKitInfoProvider) infoProvider: ICreationKitInfoProvider,
        @inject(IPathResolver) pathResolver: IPathResolver
    ) {
        const createClientObservable = (game: PapyrusGame) => {
            return combineLatest(
                configProvider.config.pipe(map((config) => config[game])),
                infoProvider.infos.get(game)!
            ).pipe(
                asyncDisposable<[IGameConfig, ICreationKitInfo], LanguageClientHost>(
                    ([gameConfig, creationKitInfo]) =>
                        new LanguageClientHost(game, gameConfig, creationKitInfo, pathResolver),
                    (host) => host.start(),
                    fastDeepEqual
                )
            );
        };

        this._clients = new Map([
            ...getGames().map(
                (game) => [game, createClientObservable(game)] as [PapyrusGame, Observable<ILanguageClientHost>]
            ),
        ]);

        this._clientSubscriptions = Array.from(this._clients).map((client) =>
            client[1].subscribe((instance) => {
                // This is waiting for logging cleanup.
                // console.log('Client manager instance:', client[0], instance);
            })
        );
    }

    get clients() {
        return this._clients;
    }

    async getActiveLanguageClients(cancellationToken = new CancellationTokenSource().token) {
        const clients = await Promise.all(
            Array.from(this.clients.values()).map((client) => client.pipe(take(1)).toPromise())
        );

        if (cancellationToken.isCancellationRequested) {
            return [];
        }

        return (await Promise.all(
            clients.map(async (client) => {
                const clientStatus = await client.status.pipe(take(1)).toPromise();
                if (clientStatus !== ClientHostStatus.running) {
                    return null;
                }

                return client;
            })
        )).filter((client) => client !== null) as ILanguageClientHost[];
    }

    async getLanguageClientHost(game: PapyrusGame): Promise<ILanguageClientHost> {
        return await this.clients
            .get(game)!
            .pipe(take(1))
            .toPromise();
    }

    async getLanguageClient(game: PapyrusGame): Promise<ILanguageClient | null> {
        const clientHost = await this.getLanguageClientHost(game);

        const status = await clientHost.status.pipe(take(1)).toPromise();
        if (status !== ClientHostStatus.running) {
            return null;
        }

        return clientHost.client;
    }

    dispose() {
        for (const subscription of this._clientSubscriptions) {
            subscription.unsubscribe();
        }
    }
}

export const ILanguageClientManager: interfaces.ServiceIdentifier<ILanguageClientManager> = Symbol('languageClientManager');
