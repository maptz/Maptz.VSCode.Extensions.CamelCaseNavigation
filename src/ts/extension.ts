'use strict';

import * as vscode from 'vscode';
import * as CamelCasing from './CamelCasing';

export function activate(context: vscode.ExtensionContext) {

    let camelCaseMover: CamelCasing.ICamelCaseNavigatorService;
    camelCaseMover = new CamelCasing.CamelCaseNavigatorService();

    let moveCamelLeft = vscode.commands.registerCommand('extension.moveCamelLeftCommand', () => {
        camelCaseMover.moveCamelCaseLeft(false);
    });

    let moveCamelRight = vscode.commands.registerCommand('extension.moveCamelRightCommand', () => {
        camelCaseMover.moveCamelCaseRight(false);
    });

    // The commandId parameter must match the command field in package.json
    let extendCamelLeft = vscode.commands.registerCommand('extension.extendCamelLeftCommand', () => {
        camelCaseMover.moveCamelCaseLeft(true);
    });

    let extendCamelRight = vscode.commands.registerCommand('extension.extendCamelRightCommand', () => {
        camelCaseMover.moveCamelCaseRight(true);
    });

     let deleteCamelRight = vscode.commands.registerCommand('extension.deleteCamelCommand', () => {
        camelCaseMover.deleteCamel();
    });

    context.subscriptions.push(moveCamelLeft);
    context.subscriptions.push(moveCamelRight);
    context.subscriptions.push(extendCamelLeft);
    context.subscriptions.push(extendCamelRight);
}

export function deactivate() {

}