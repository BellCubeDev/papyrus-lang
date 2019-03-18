import { commands, Disposable } from 'vscode';

export abstract class CommandBase<TArgs = void, TResult = void> implements Disposable {
    private readonly _name: string;
    private readonly _registration: Disposable;

    constructor(name: string) {
        this._name = name;
        this._registration = commands.registerCommand(this._name, (args) => {
            return this.onExecute(args);
        });
    }

    get name() {
        return this._name;
    }

    execute(args: TArgs) {
        return commands.executeCommand<TResult>(this._name, args);
    }

    dispose() {
        this._registration.dispose();
    }

    protected abstract onExecute(args: TArgs): TResult | Thenable<TResult>;
}