﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DarkId.Papyrus.LanguageService.Syntax
{
    public enum SyntaxKind
    {
        None,
        Unknown,

        LineContinuationTrivia,
        NewLineTrivia,
        WhitespaceTrivia,

        IdentifierToken,
        HexLiteralToken,
        IntLiteralToken,
        FloatLiteralToken,
        EndOfFileToken,
        OpenBraceToken,
        CloseBraceToken,
        OpenParenToken,
        CloseParenToken,
        OpenBracketToken,
        CloseBracketToken,
        DotToken,
        SemicolonToken,
        CommaToken,
        LessThanToken,
        GreaterThanToken,
        LessThanEqualsToken,
        GreaterThanEqualsToken,
        EqualsEqualsToken,
        ExclamationEqualsToken,
        PlusToken,
        MinusToken,
        AsteriskToken,
        SlashToken,
        PercentToken,
        PlusPlusToken,
        MinusMinusToken,
        ExclamationToken,
        AmpersandAmpersandToken,
        BarBarToken,
        DoubleQuoteToken,
        EqualsToken,
        PlusEqualsToken,
        MinusEqualsToken,
        AsteriskEqualsToken,
        SlashEqualsToken,
        PercentEqualsToken,
        BackslashToken,
        SemicolonSlashToken,
        SlashSemicolonToken,
        ArrayToken,

        AsKeyword,
        AutoKeyword,
        AutoReadOnlyKeyword,
        BetaOnlyKeyword,
        ConstKeyword,
        CustomEventKeyword,
        DebugOnlyKeyword,
        ElseIfKeyword,
        ElseKeyword,
        EndEventKeyword,
        EndFunctionKeyword,
        EndGroupKeyword,
        EndIfKeyword,
        EndPropertyKeyword,
        EndStateKeyword,
        EndStructKeyword,
        EndWhileKeyword,
        EventKeyword,
        ExtendsKeyword,
        FunctionKeyword,
        GlobalKeyword,
        GroupKeyword,
        IfKeyword,
        ImportKeyword,
        IsKeyword,
        NativeKeyword,
        NewKeyword,
        PropertyKeyword,
        ReturnKeyword,
        ScriptNameKeyword,
        StateKeyword,
        StructKeyword,
        WhileKeyword,
        TrueKeyword,
        FalseKeyword,
        NoneKeyword,

        StringLiteralContent,
        SingleLineComment,
        DocumentationComment,
        MultilineComment,

        ArrayIndexExpression,
        AssignmentStatement,
        BinaryOperationExpression,
        BoolLiteral,
        CastExpression,
        CustomEventDefinition,
        DeclareStatement,
        EventDefinition,
        ExpressionStatement,
        FloatLiteral,
        FunctionCallExpression,
        FunctionCallExpressionParameter,
        FunctionDefinition,
        FunctionParameter,
        GroupDefinition,
        HexLiteral,
        Identifier,
        IdentifierExpression,
        IfStatement,
        IfStatementBody,
        Import,
        IntLiteral,
        IsExpression,
        LiteralExpression,
        MemberAccessExpression,
        NewArrayExpression,
        NewStructExpression,
        NoneLiteral,
        ParenExpression,
        PropertyDefinition,
        ReturnStatement,
        Script,
        StateDefinition,
        StringLiteral,
        StructDefinition,
        TypeIdentifier,
        UnaryOperationExpression,
        VariableDefinition,
        WhileStatement,
        ScriptHeader,
        FunctionHeader,
        StateHeader
    }
}
