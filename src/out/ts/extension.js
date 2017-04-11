'use strict';
var vscode = require('vscode');
var CamelCasing = require('./CamelCasing');
function activate(context) {
    var camelCaseMover;
    camelCaseMover = new CamelCasing.CamelCaseNavigatorService();
    var moveCamelLeft = vscode.commands.registerCommand('extension.moveCamelLeftCommand', function () {
        camelCaseMover.moveCamelCaseLeft(false);
    });
    var moveCamelRight = vscode.commands.registerCommand('extension.moveCamelRightCommand', function () {
        camelCaseMover.moveCamelCaseRight(false);
    });
    // The commandId parameter must match the command field in package.json
    var extendCamelLeft = vscode.commands.registerCommand('extension.extendCamelLeftCommand', function () {
        camelCaseMover.moveCamelCaseLeft(true);
    });
    var extendCamelRight = vscode.commands.registerCommand('extension.extendCamelRightCommand', function () {
        camelCaseMover.moveCamelCaseRight(true);
    });
    context.subscriptions.push(moveCamelLeft);
    context.subscriptions.push(moveCamelRight);
    context.subscriptions.push(extendCamelLeft);
    context.subscriptions.push(extendCamelRight);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map