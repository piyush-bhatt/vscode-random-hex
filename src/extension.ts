import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const generateRandomHexColorCode = vscode.commands.registerCommand(
    'vscode-random-hex.generateRandomHexColorCode',
    () => {
      // Get randomly generated hex color code
    },
  );

  const fillRandomHexColorCode = vscode.commands.registerCommand('vscode-random-hex.fillRandomHexColorCode', () => {
    // Fill random hex codes in selection(s)
  });

  const fillUniqueRandomHexColorCode = vscode.commands.registerCommand(
    'vscode-random-hex.fillUniqueRandomHexColorCode',
    () => {
      // Fill unique random hex codes in selection(s)
    },
  );

  context.subscriptions.push(generateRandomHexColorCode, fillRandomHexColorCode, fillUniqueRandomHexColorCode);
}

export function deactivate() {}
