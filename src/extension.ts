'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const opn = require('opn');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    console.log('Extension "vsc-view-in-browser" is active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let disposable = vscode.commands.registerCommand('extension.daichangVscViewInBrowser', (args) => {
        let target:String = '';
        let config = vscode.workspace.getConfiguration('daichangViewInBrowser');
        let options = config.options;

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active text editor found!');
            return;
        }
        target = editor.document.fileName;
        if(target){
            if(config.handle){
                eval(config.handle);
            }
            console.log('Viewing:',target.toString());
            if(Object.keys(options).length>0){
                opn(target,options);
            }else{
                opn(target);
            }
        }
        
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.warn('Extension "vsc-view-in-browser" is deactive!');
}