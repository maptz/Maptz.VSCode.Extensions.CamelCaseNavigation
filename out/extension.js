'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CamelCasing = require("./CamelCasing");
function navigateToSelection() {
    vscode.window.activeTextEditor.revealRange(new vscode.Range(vscode.window.activeTextEditor.selection.start, vscode.window.activeTextEditor.selection.end), vscode.TextEditorRevealType.Default);
}
function activate(context) {
    let _something = "";
    let camelCaseMover;
    camelCaseMover = new CamelCasing.CamelCaseNavigatorService();
    let moveCamelLeft = vscode.commands.registerCommand('extension.moveCamelLeftCommand', () => {
        camelCaseMover.moveCamelCaseLeft(false);
        navigateToSelection();
    });
    let moveCamelRight = vscode.commands.registerCommand('extension.moveCamelRightCommand', () => {
        camelCaseMover.moveCamelCaseRight(false);
        navigateToSelection();
    });
    // The commandId parameter must match the command field in package.json
    let extendCamelLeft = vscode.commands.registerCommand('extension.extendCamelLeftCommand', () => {
        camelCaseMover.moveCamelCaseLeft(true);
        navigateToSelection();
    });
    let extendCamelRight = vscode.commands.registerCommand('extension.extendCamelRightCommand', () => {
        camelCaseMover.moveCamelCaseRight(true);
        navigateToSelection();
    });
    let deleteCamelLeft = vscode.commands.registerCommand('extension.deleteCamelLeftCommand', () => {
        camelCaseMover.deleteCamelLeft();
        navigateToSelection();
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