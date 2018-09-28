'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const xregexp = require('xregexp');

export class CamelComponent {
    private _text = "";
    private static _letterRegexp = new xregexp('\\pL+');

    public get text(): string {
        return this._text;
    }

    public get isSpaceComponent() {

        if (this.text.length == 0)
            //If the word is zero-length return false. 
            return false;
        //Get whether all the characters in this word are spaces.
        let areAllCharactersSpace = true;
        for (var index = 0; index < this.text.length; index++) {
            var element = this.text[index];
            if (element != ' ' && element != '\t') {
                areAllCharactersSpace = false;
                break;
            }
        }
        //Return true if all the characters are spaces, otherwise false. 
        return areAllCharactersSpace;

    }

    public get isSymbolComponent() {

        if (this.text.length == 0)
            //If the word is zero-length return false. 
            return false;
        let areAllCharactersSymbols = true;
        for (var index = 0; index < this.text.length; index++) {
            var element = this.text[index];
            if (CamelComponent.isSpace(element) || CamelComponent.isLetterOrNumber(element)) {
                areAllCharactersSymbols = false;
                break;
            }
        }
        return areAllCharactersSymbols;
    }

    public static isLetterOrNumber(char: string) {
        return CamelComponent.isLetter(char) || CamelComponent.isNumber(char);
    }

    public static isLetter(char: string) {
        //Using 'xregexp' to include Cyrillic letters. Issue #4
        return CamelComponent._letterRegexp.test(char);
        //var retval = /[a-zA-Z\u00C0-\u017F]+/.test(char);        
        //return retval;
    }

    public static isSymbol(char: string) {
        return !/[0-9a-zA-Z\u00C0-\u017F]+/.test(char);
    }

    public static isNumber(char: string) {
        return /[0-9]+/.test(char);
    }

    public static isUpperCase(char: string) {
        var isLetter = CamelComponent.isLetter(char);
        return isLetter && char.toUpperCase() == char;
    }

    public static isLowerFase(char: string) {
        var isLetter = CamelComponent.isLetter(char);
        return isLetter && char.toLowerCase() == char;
    }
    public static isSpace(char: string) {

        var retva= /[\s\t]+/.test(char);
        console.log(`test ${char} : ${retva}`);
        return retva;
    }



    public get isWordComponent() {

        if (this.text.length == 0)
            //If the word is of zero-length, return false. 
            return false;

        let areAllCharsLettersOrDigits = true;
        for (var index = 0; index < this.text.length; index++) {
            var element = this.text[index];
            if (!CamelComponent.isLetterOrNumber(element)) {
                areAllCharsLettersOrDigits = false;
                break;
            }
        }

        if (this.text.length == 1)
            //if this is a one-letter word, then this is a letter word if the single character is a letter or a digit. 
            //Return this value.
            return areAllCharsLettersOrDigits;

        //Get all the letters except the first letter. 
        let remainder = this.text.substr(1);

        //Get a value indicating if the first letter is uppercase. 
        let isFirstLetterUpperCase = CamelComponent.isUpperCase(this.text.substr(0, 1));

        //Get a value indicating whether all the character other than the first letter are lower case or digits.
        let remainderIsLowerCaseOrDigits = true;
        for (let index = 0; index < remainder.length; index++) {
            let element = remainder[index];
            if (CamelComponent.isLowerFase(element)) {

            }
            else if (CamelComponent.isNumber(element)) {

            }
            else {
                remainderIsLowerCaseOrDigits = false;
            }

        }

        let remainderIsUpper = true;
        for (let index = 0; index < remainder.length; index++) {
            let element = remainder[index];
            if (CamelComponent.isUpperCase(element)) {

            }
            else {
                remainderIsUpper = false;
            }

        }

        //This is a letter word if and only if all the letters are digits and letters or digits and either (the remainder is lower case or digit or (the whole string is upper case).
        return areAllCharsLettersOrDigits && (remainderIsLowerCaseOrDigits || (remainderIsUpper && isFirstLetterUpperCase));

    }


    public addChar(c: string) {
        //Get a value indicating if you are allowed to add the 
        let canAddChar = this.canAddChar(c);
        if (!canAddChar)
            //If you are not allowed to add the character throw an exception.
            throw "Cannot add the character '" + c + "' to the word '" + this.text + "'.";

        this._text += c;
    }

    public tryAddChar(c: string): boolean {
        //Get a value indicating if you are allowed to add the 
        let canAddChar = this.canAddChar(c);
        if (!canAddChar)
            //If adding this character would cause an invalid term, return false. 
            return false;
        //Otherwise, add the character and return true. 
        this._text += c;
        return true;
    }

    public canAddChar(c: string) {
        if (this.text == null || this.text.length == 0)
            //If the current word length is zero, then return true. 
            return true;

        if (this.isSpaceComponent)
            //If this is a space word, then return true if and only if the specified character is a space. 
            return c == ' ';

        if (this.isSymbolComponent) {
            let isLetterOrDigit = CamelComponent.isLetterOrNumber(c);
            //If this word is a symbol word, then return true if and only if the specified character is a symbol of the same kind
            return (c != ' ') && (!isLetterOrDigit) && this.text[0] == c;
        }

        let isAllUpper = true;
        for (var index = 0; index < this.text.length; index++) {
            var element = this.text[index];
            var isUpper = CamelComponent.isUpperCase(element);
            if (!isUpper) {
                isAllUpper = false;
            }
        }


        if (isAllUpper) {
            //If this is all upper case, then you can add any upper case letter. 
            if (CamelComponent.isUpperCase(c))
                //If the specified char is upper case, return true. 
                return true;

            if (CamelComponent.isLowerFase(c) || CamelComponent.isNumber(c)) {
                //If the character is a letter or a number, we can only add another letter if this word is one upper case letter long or zero-length.
                //NOTE we've already encountered the zero case. 
                //return this.text.length == 1;
                return true;
            }
        }
        //If this is a valid word consisting of lower case elements and digits. Allow addition of any lower case character or number but nothing else. 
        return (CamelComponent.isLowerFase(c) || CamelComponent.isNumber(c));

    }
}

export class CamelString {

    private _camelComponents: CamelComponent[];
    public get camelComponents() {
        return this._camelComponents;
    }

    constructor(sourceString: string) {
        if (!sourceString) return;

        //Initialize the CamelComponents list. 
        this._camelComponents = [];

        //Create a new CamelComponent.
        let lastCamelComponent = new CamelComponent();
        this.camelComponents.push(lastCamelComponent);
        for (let i = 0; i < sourceString.length; i++) {
            //Walk through each character in the source string. 
            //Try to add the character to the existing 
            let hasAddedCharacter = lastCamelComponent.tryAddChar(sourceString[i]);
            if (!hasAddedCharacter) {
                //If we haven't been able to add the character, we'll have to start a new CamelComponent. 
                lastCamelComponent = new CamelComponent();
                //Add the new camelComponent to the internal list.
                this.camelComponents.push(lastCamelComponent);
                //Add the character to the new camel component. 
                lastCamelComponent.addChar(sourceString[i]);
            }
        }
    }

    public toString() {
        let retval = "";
        //Walk through each camel component.
        for (var index = 0; index < this._camelComponents.length; index++) {
            var element = this._camelComponents[index];
            retval += element.text;
        }
        return retval;
    }
}

export class CamelCasingHelper {
    public static getCamelWords(source: string) {
        if (source == null)
            //If the source is null, throw an exception.
            throw "ArgumentNullException('source')";
        //Create a new CamelString containing the source string. 
        let camelString = new CamelString(source);
        let camelWords = [];
        for (var index = 0; index < camelString.camelComponents.length; index++) {
            var element = camelString.camelComponents[index];
            camelWords.push(element.text);
        }

        return camelWords;
    }

    public static indexOfCamelComponent(source: string): number {
        if (source == null)
            //If the source is null, throw an exception.
            throw "ArgumentNullException('source'')";
        //Create a new CamelString containing the source string. 
        let camelString = new CamelString(source);
        if (camelString.camelComponents.length == 1)
            //If there are fewer than two camelComponents, just return the length of the string
            return source.length;
        else
            //Otherwise, return the length of the first camel component (i.e. the index of the first CamelComponent)
            return camelString.camelComponents[0].text.length;
    }


    /// <summary>
    /// Gets the index of the last camel component of a string. 
    /// </summary>
    /// <param name="source">The source.</param>
    /// <returns></returns>
    public static lastIndexOfCamelComponent(source: string): number {
        if (source == null)
            throw "ArgumentNullException('source')";

        //Create a new CamelString containing the source string. 
        let camelString = new CamelString(source);
        if (camelString.camelComponents.length == 1)
            //If there are fewer than two camelComponents, just return zero.
            return 0;
        else
            //Otherwise, return the length of the text minus the length of the last camel component.
            return source.length - camelString.camelComponents[camelString.camelComponents.length - 1].text.length;
    }

}

export interface ICamelCaseNavigatorService {
    deleteCamelRight();
    deleteCamelLeft();
    moveCamelCaseLeft(extendSelection: boolean);
    moveCamelCaseRight(extendSelection: boolean);
}

export class CamelCaseNavigatorService implements ICamelCaseNavigatorService {


    public deleteCamel(isLeft: boolean) {
        var deleteCamel = true;
        for (let sel of vscode.window.activeTextEditor.selections) {
            deleteCamel = deleteCamel && sel.end.isEqual(sel.start);
        }
        if (!deleteCamel) {
            //and then just normally delete the selection.
            vscode.commands.executeCommand("deleteLeft");
            return;
        }

        var newSelections: vscode.Selection[] = []
        for (let sel of vscode.window.activeTextEditor.selections) {
            if (isLeft) {
                var selection = this.moveCamelCaseLeftInternal(true, sel);
                newSelections.push(selection);
            }
            else {
                var selection = this.moveCamelCaseRightInternal(true, sel);
                newSelections.push(selection);
            }
        }

        vscode.window.activeTextEditor.edit(editBuilder => {
            for (let selection of newSelections) {
                editBuilder.delete(selection);
            }
        }, {
                undoStopAfter: true,
                undoStopBefore: true
            }
        )
        return;
        //I don't think this is necessary, but if you need to edit the document, then here:
        //http://www.chrisstead.com/archives/1082/visual-studio-code-extensions-editing-the-document/
    }

    public deleteCamelLeft() {
        this.deleteCamel(true);
    }

    public deleteCamelRight() {
        this.deleteCamel(false);
    }

    public moveCamelCaseLeft(extendSelection: boolean) {
        var newSelections = []
        for (let sel of vscode.window.activeTextEditor.selections) {
            var selection = this.moveCamelCaseLeftInternal(extendSelection, sel);
            newSelections.push(selection);
        }
        vscode.window.activeTextEditor.selections = newSelections;
    }

    private moveCamelCaseLeftInternal(extendSelection: boolean, currentSelection: vscode.Selection): vscode.Selection {

        let currentLineText = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line).text;
        let textFromStartOfLine = currentLineText.substr(0, currentSelection.active.character);
        //Remove diacritics
        textFromStartOfLine = textFromStartOfLine.replace(/[\u0300-\u036f]/g, "a");
        let lineDelta = 0;
        let charDelta = 0;
        if (textFromStartOfLine.length == 0) {
            if (currentSelection.active.line == 0) { return currentSelection; }

            //Move up a line...
            lineDelta = -1;
            let previousLineLength = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line + lineDelta).text.length;
            charDelta = previousLineLength - currentSelection.active.character;
        }
        else {
            let lastCamelCaseComponentIndex = CamelCasingHelper.lastIndexOfCamelComponent(textFromStartOfLine);
            charDelta = 0 - (textFromStartOfLine.length - lastCamelCaseComponentIndex);
        }

        var newPosition = currentSelection.active.translate(lineDelta, charDelta);
        var newAnchor = extendSelection ? currentSelection.anchor : newPosition;
        var newSelection = new vscode.Selection(newAnchor, newPosition);

        return newSelection;
    }

    public moveCamelCaseRight(extendSelection: boolean) {
        var newSelections = []
        for (let sel of vscode.window.activeTextEditor.selections) {
            var selection = this.moveCamelCaseRightInternal(extendSelection, sel);
            newSelections.push(selection);
        }
        vscode.window.activeTextEditor.selections = newSelections;
    }
    private moveCamelCaseRightInternal(extendSelection: boolean, currentSelection: vscode.Selection): vscode.Selection {

        let currentLineText = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line).text;
        let textToEndOfLine = currentLineText.substr(currentSelection.active.character);
        //Remove diacritics
        textToEndOfLine = textToEndOfLine.replace(/[\u0300-\u036f]/g, "a");
        let lineDelta = 0;
        let charDelta = 0;
        if (textToEndOfLine.length == 0) {
            if (currentSelection.active.line == vscode.window.activeTextEditor.document.lineCount - 1) {
                return currentSelection;
            }
            //Move down a line...
            lineDelta = +1;
            let nextLineLength = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line + lineDelta).text.length;
            charDelta = 0 - currentSelection.active.character;
        }
        else {
            let camelCaseComponentIndex = CamelCasingHelper.indexOfCamelComponent(textToEndOfLine);
            charDelta = camelCaseComponentIndex;
        }
        var newPosition = currentSelection.active.translate(lineDelta, charDelta);
        var newAnchor = extendSelection ? currentSelection.anchor : newPosition;
        var newSelection = new vscode.Selection(newAnchor, newPosition);
        return newSelection;

    }


}
