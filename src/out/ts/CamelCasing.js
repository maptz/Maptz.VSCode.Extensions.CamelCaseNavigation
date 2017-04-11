'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var CamelComponent = (function () {
    function CamelComponent() {
        this._text = "";
    }
    Object.defineProperty(CamelComponent.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CamelComponent.prototype, "isSpaceComponent", {
        get: function () {
            if (this.text.length == 0)
                //If the word is zero-length return false. 
                return false;
            //Get whether all the characters in this word are spaces.
            var areAllCharactersSpace = true;
            for (var index = 0; index < this.text.length; index++) {
                var element = this.text[index];
                if (element != ' ') {
                    areAllCharactersSpace = false;
                    break;
                }
            }
            //Return true if all the characters are spaces, otherwise false. 
            return areAllCharactersSpace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CamelComponent.prototype, "isSymbolComponent", {
        get: function () {
            if (this.text.length == 0)
                //If the word is zero-length return false. 
                return false;
            var areAllCharactersSymbols = true;
            for (var index = 0; index < this.text.length; index++) {
                var element = this.text[index];
                if (CamelComponent.isSpace(element) || CamelComponent.isLetterOrNumber(element)) {
                    areAllCharactersSymbols = false;
                    break;
                }
            }
            return areAllCharactersSymbols;
        },
        enumerable: true,
        configurable: true
    });
    CamelComponent.isLetterOrNumber = function (char) {
        return /[0-9A-Za-zÀ-ÿ]+/.test(char);
    };
    CamelComponent.isLetter = function (char) {
        return /[A-Za-zÀ-ÿ]+/.test(char);
    };
    CamelComponent.isSymbol = function (char) {
        return !/[0-9A-Za-zÀ-ÿ]+/.test(char);
    };
    CamelComponent.isNumber = function (char) {
        return /[0-9]+/.test(char);
    };
    CamelComponent.isUpperCase = function (char) {
        var isLetter = CamelComponent.isLetter(char);
        return isLetter && char.toUpperCase() == char;
    };
    CamelComponent.isLowerFase = function (char) {
        var isLetter = CamelComponent.isLetter(char);
        return isLetter && char.toLowerCase() == char;
    };
    CamelComponent.isSpace = function (char) {
        return /[\s]+/.test(char);
    };
    Object.defineProperty(CamelComponent.prototype, "isWordComponent", {
        get: function () {
            if (this.text.length == 0)
                //If the word is of zero-length, return false. 
                return false;
            var areAllCharsLettersOrDigits = true;
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
            var remainder = this.text.substr(1);
            //Get a value indicating if the first letter is uppercase. 
            var isFirstLetterUpperCase = CamelComponent.isUpperCase(this.text.substr(0, 1));
            //Get a value indicating whether all the character other than the first letter are lower case or digits.
            var remainderIsLowerCaseOrDigits = true;
            for (var index_1 = 0; index_1 < remainder.length; index_1++) {
                var element_1 = remainder[index_1];
                if (CamelComponent.isLowerFase(element_1)) {
                }
                else if (CamelComponent.isNumber(element_1)) {
                }
                else {
                    remainderIsLowerCaseOrDigits = false;
                }
            }
            var remainderIsUpper = true;
            for (var index_2 = 0; index_2 < remainder.length; index_2++) {
                var element_2 = remainder[index_2];
                if (CamelComponent.isUpperCase(element_2)) {
                }
                else {
                    remainderIsUpper = false;
                }
            }
            //This is a letter word if and only if all the letters are digits and letters or digits and either (the remainder is lower case or digit or (the whole string is upper case).
            return areAllCharsLettersOrDigits && (remainderIsLowerCaseOrDigits || (remainderIsUpper && isFirstLetterUpperCase));
        },
        enumerable: true,
        configurable: true
    });
    CamelComponent.prototype.addChar = function (c) {
        //Get a value indicating if you are allowed to add the 
        var canAddChar = this.canAddChar(c);
        if (!canAddChar)
            //If you are not allowed to add the character throw an exception.
            throw "Cannot add the character '" + c + "' to the word '" + this.text + "'.";
        this._text += c;
    };
    CamelComponent.prototype.tryAddChar = function (c) {
        //Get a value indicating if you are allowed to add the 
        var canAddChar = this.canAddChar(c);
        if (!canAddChar)
            //If adding this character would cause an invalid term, return false. 
            return false;
        //Otherwise, add the character and return true. 
        this._text += c;
        return true;
    };
    CamelComponent.prototype.canAddChar = function (c) {
        if (this.text == null || this.text.length == 0)
            //If the current word length is zero, then return true. 
            return true;
        if (this.isSpaceComponent)
            //If this is a space word, then return true if and only if the specified character is a space. 
            return c == ' ';
        if (this.isSymbolComponent) {
            var isLetterOrDigit = CamelComponent.isLetterOrNumber(c);
            //If this word is a symbol word, then return true if and only if the specified character is a symbol of the same kind
            return (c != ' ') && (!isLetterOrDigit) && this.text[0] == c;
        }
        var isAllUpper = true;
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
    };
    return CamelComponent;
}());
exports.CamelComponent = CamelComponent;
var CamelString = (function () {
    function CamelString(sourceString) {
        if (!sourceString)
            return;
        //Initialize the CamelComponents list. 
        this._camelComponents = [];
        //Create a new CamelComponent.
        var lastCamelComponent = new CamelComponent();
        this.camelComponents.push(lastCamelComponent);
        for (var i = 0; i < sourceString.length; i++) {
            //Walk through each character in the source string. 
            //Try to add the character to the existing 
            var hasAddedCharacter = lastCamelComponent.tryAddChar(sourceString[i]);
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
    Object.defineProperty(CamelString.prototype, "camelComponents", {
        get: function () {
            return this._camelComponents;
        },
        enumerable: true,
        configurable: true
    });
    CamelString.prototype.toString = function () {
        var retval = "";
        //Walk through each camel component.
        for (var index = 0; index < this._camelComponents.length; index++) {
            var element = this._camelComponents[index];
            retval += element.text;
        }
        return retval;
    };
    return CamelString;
}());
exports.CamelString = CamelString;
var CamelCasingHelper = (function () {
    function CamelCasingHelper() {
    }
    CamelCasingHelper.getCamelWords = function (source) {
        if (source == null)
            //If the source is null, throw an exception.
            throw "ArgumentNullException('source')";
        //Create a new CamelString containing the source string. 
        var camelString = new CamelString(source);
        var camelWords = [];
        for (var index = 0; index < camelString.camelComponents.length; index++) {
            var element = camelString.camelComponents[index];
            camelWords.push(element.text);
        }
        return camelWords;
    };
    CamelCasingHelper.indexOfCamelComponent = function (source) {
        if (source == null)
            //If the source is null, throw an exception.
            throw "ArgumentNullException('source'')";
        //Create a new CamelString containing the source string. 
        var camelString = new CamelString(source);
        if (camelString.camelComponents.length == 1)
            //If there are fewer than two camelComponents, just return the length of the string
            return source.length;
        else
            //Otherwise, return the length of the first camel component (i.e. the index of the first CamelComponent)
            return camelString.camelComponents[0].text.length;
    };
    /// <summary>
    /// Gets the index of the last camel component of a string. 
    /// </summary>
    /// <param name="source">The source.</param>
    /// <returns></returns>
    CamelCasingHelper.lastIndexOfCamelComponent = function (source) {
        if (source == null)
            throw "ArgumentNullException('source')";
        //Create a new CamelString containing the source string. 
        var camelString = new CamelString(source);
        if (camelString.camelComponents.length == 1)
            //If there are fewer than two camelComponents, just return zero.
            return 0;
        else
            //Otherwise, return the length of the text minus the length of the last camel component.
            return source.length - camelString.camelComponents[camelString.camelComponents.length - 1].text.length;
    };
    return CamelCasingHelper;
}());
exports.CamelCasingHelper = CamelCasingHelper;
var CamelCaseNavigatorService = (function () {
    function CamelCaseNavigatorService() {
    }
    CamelCaseNavigatorService.prototype.moveCamelCaseLeft = function (extendSelection) {
        var currentSelection = vscode.window.activeTextEditor.selection;
        var currentLineText = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line).text;
        var textFromStartOfLine = currentLineText.substr(0, currentSelection.active.character);
        var lineDelta = 0;
        var charDelta = 0;
        if (textFromStartOfLine.length == 0) {
            if (currentSelection.active.line == 0) {
                return;
            }
            //Move up a line...
            lineDelta = -1;
            var previousLineLength = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line + lineDelta).text.length;
            charDelta = previousLineLength - currentSelection.active.character;
        }
        else {
            var lastCamelCaseComponentIndex = CamelCasingHelper.lastIndexOfCamelComponent(textFromStartOfLine);
            charDelta = 0 - (textFromStartOfLine.length - lastCamelCaseComponentIndex);
        }
        var newPosition = currentSelection.active.translate(lineDelta, charDelta);
        var newAnchor = extendSelection ? currentSelection.anchor : newPosition;
        var newSelection = new vscode.Selection(newAnchor, newPosition);
        vscode.window.activeTextEditor.selection = newSelection;
    };
    CamelCaseNavigatorService.prototype.moveCamelCaseRight = function (extendSelection) {
        var currentSelection = vscode.window.activeTextEditor.selection;
        var currentLineText = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line).text;
        var textToEndOfLine = currentLineText.substr(currentSelection.active.character);
        var lineDelta = 0;
        var charDelta = 0;
        if (textToEndOfLine.length == 0) {
            if (currentSelection.active.line == vscode.window.activeTextEditor.document.lineCount - 1) {
                return;
            }
            //Move down a line...
            lineDelta = +1;
            var nextLineLength = vscode.window.activeTextEditor.document.lineAt(currentSelection.active.line + lineDelta).text.length;
            charDelta = 0 - currentSelection.active.character;
        }
        else {
            var camelCaseComponentIndex = CamelCasingHelper.indexOfCamelComponent(textToEndOfLine);
            charDelta = camelCaseComponentIndex;
        }
        var newPosition = currentSelection.active.translate(lineDelta, charDelta);
        var newAnchor = extendSelection ? currentSelection.anchor : newPosition;
        var newSelection = new vscode.Selection(newAnchor, newPosition);
        vscode.window.activeTextEditor.selection = newSelection;
    };
    return CamelCaseNavigatorService;
}());
exports.CamelCaseNavigatorService = CamelCaseNavigatorService;
//# sourceMappingURL=CamelCasing.js.map