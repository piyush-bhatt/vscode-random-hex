import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('vscode-random-hex.generateRandomHexCode', () => {
    // Get randomly generated hex color code
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
