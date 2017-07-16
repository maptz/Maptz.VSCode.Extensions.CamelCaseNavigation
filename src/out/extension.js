'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CamelCasing = require("./CamelCasing");
function activate(context) {
    let camelCaseMover;
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
    let deleteCamelLeft = vscode.commands.registerCommand('extension.deleteCamelLeftCommand', () => {
        camelCaseMover.deleteCamelLeft();
    });
    let deleteCamelRight = vscode.commands.registerCommand('extension.deleteCamelRightCommand', () => {
        camelCaseMover.deleteCamelRight();
    });
    context.subscriptions.push(moveCamelLeft);
    context.subscriptions.push(moveCamelRight);
    context.subscriptions.push(extendCamelLeft);
    context.subscriptions.push(extendCamelRight);
    context.subscriptions.push(deleteCamelLeft);
    context.subscriptions.push(deleteCamelRight);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map