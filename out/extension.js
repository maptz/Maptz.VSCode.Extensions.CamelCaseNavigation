'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CamelCasing = require("./CamelCasing");
const IConfiguration = require("./IConfiguration");
function loadConfiguration() {
    let loadedConfig = vscode.workspace
        .getConfiguration()
        .get("maptz.camelcasenavigation");
    let config = Object.assign({}, IConfiguration.DefaultConfigurationSection);
    config = Object.assign(config, loadedConfig);
    return config;
}
let isCamelModeOn = true;
var configuration = loadConfiguration();
if (configuration.allowToggleMode) {
    isCamelModeOn = configuration.isCamelNavigationOnByDefault;
}
function navigateToSelection() {
    vscode.window.activeTextEditor.revealRange(new vscode.Range(vscode.window.activeTextEditor.selection.start, vscode.window.activeTextEditor.selection.end), vscode.TextEditorRevealType.Default);
}
function activate(context) {
    let _something = "";
    let camelCaseMover;
    camelCaseMover = new CamelCasing.CamelCaseNavigatorService();
    var allCommandNames = [
        "deleteCamelLeftCommand",
        "deleteCamelRightCommand",
        "extendCamelLeftCommand",
        "extendCamelRightCommand",
        "moveCamelLeftCommand",
        "moveCamelRightCommand",
        "toggleCamelMode"
    ];
    for (let cn of allCommandNames) {
        vscode.commands.registerCommand('extension.' + cn, () => {
            vscode.window.showInformationMessage("Deprecated: CamelCaseNavigation extension commands have changed.\r\nUpdate keybindings from \r\n"
                + " 'extension." + cn + "' to 'maptz.camelcasenavigation." + cn + "'.");
        });
    }
    let toggleCamelMode = vscode.commands.registerCommand('maptz.camelcasenavigation.toggleCamelMode', () => {
        if (!configuration.allowToggleMode)
            return;
        isCamelModeOn = !isCamelModeOn;
        var onOffText = isCamelModeOn ? "on" : "off";
        vscode.window.showInformationMessage("Camel Navigation is now " + onOffText);
    });
    let moveCamelLeft = vscode.commands.registerCommand('maptz.camelcasenavigation.moveCamelLeftCommand', () => {
        if (isCamelModeOn) {
            camelCaseMover.moveCamelCaseLeft(false);
            navigateToSelection();
        }
        else {
            vscode.commands.executeCommand("cursorWordLeft");
        }
    });
    let moveCamelRight = vscode.commands.registerCommand('maptz.camelcasenavigation.moveCamelRightCommand', () => {
        if (isCamelModeOn) {
            camelCaseMover.moveCamelCaseRight(false);
            navigateToSelection();
        }
        else {
            vscode.commands.executeCommand("cursorWordRight");
        }
    });
    // The commandId parameter must match the command field in package.json
    let extendCamelLeft = vscode.commands.registerCommand('maptz.camelcasenavigation.extendCamelLeftCommand', () => {
        if (isCamelModeOn) {
            camelCaseMover.moveCamelCaseLeft(true);
            navigateToSelection();
        }
        else {
            vscode.commands.executeCommand("cursorWordLeftSelect");
        }
    });
    let extendCamelRight = vscode.commands.registerCommand('maptz.camelcasenavigation.extendCamelRightCommand', () => {
        if (isCamelModeOn) {
            camelCaseMover.moveCamelCaseRight(true);
            navigateToSelection();
        }
        else {
            vscode.commands.executeCommand("cursorWordRightSelect");
        }
    });
    let deleteCamelLeft = vscode.commands.registerCommand('maptz.camelcasenavigation.deleteCamelLeftCommand', () => {
        if (isCamelModeOn) {
            camelCaseMover.deleteCamelLeft();
            navigateToSelection();
        }
        else {
            vscode.commands.executeCommand("deleteWordLeft");
        }
    });
    let deleteCamelRight = vscode.commands.registerCommand('maptz.camelcasenavigation.deleteCamelRightCommand', () => {
        if (isCamelModeOn) {
            camelCaseMover.deleteCamelRight();
            navigateToSelection();
        }
        else {
            vscode.commands.executeCommand("deleteWordRight");
        }
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