# Visual Studio Camel Case Navigation Extension

![Header](https://raw.githubusercontent.com/maptz/Maptz.VSCode.Extensions.CamelCaseNavigation/master/imgs/Icon.png)

This extension provides camel-case navigation to the Visual Studio Code editor.

![Camel Navigation](https://raw.githubusercontent.com/maptz/Maptz.VSCode.Extensions.CamelCaseNavigation/master/imgs/CSharp_camelcase.gif)

It works by adding four extension methods to the IDE which override the default actions for the `left` and `right` arrow keys.  

- MoveCamelLeftCommand (Ctrl+Left)
- MoveCamelRightCommand  (Ctrl+Right)
- ExtendCamelLeftCommand  (Ctrl+Shift+Left)
- ExtendCamelRightCommand (Ctrl+Shift+Right)

## Installing

You can install the latest version of the extension is available on the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=maptz.camelcasenavigation).

Alternatively, open Visual Studio code, press `Ctrl+P` and type:

> ext install camelcasenavigation

## Source Code

The source code is available on GitHub [here](https://github.com/maptz/Maptz.VSCode.Extensions.CamelCaseNavigation).

## Release Notes

### Version 0.3.49

- Updated the default code bindings for different platforms. See [here](https://github.com/maptz/Maptz.VSCode.Extensions.CamelCaseNavigation/issues/18) and [here](https://github.com/maptz/Maptz.VSCode.Extensions.CamelCaseNavigation/issues/20)
- Enhanced the behaviour when using tabs rather than spaces. See [here](https://github.com/maptz/Maptz.VSCode.Extensions.CamelCaseNavigation/issues/19)
