import * as vscode from 'vscode';
import { FormatType, getRandomHex, processSelection } from './utils';

export function activate(context: vscode.ExtensionContext) {
  const generateRandomHexColorCode = vscode.commands.registerCommand(
    'vscode-random-hex.generateRandomHexColorCode',
    async () => {
      const randomHexCode = getRandomHex();
      await vscode.env.clipboard.writeText(randomHexCode);
      vscode.window.showInformationMessage(`${randomHexCode} copied to clipboard`);
    },
  );

  const fillRandomHexColorCode = vscode.commands.registerCommand('vscode-random-hex.fillRandomHexColorCode', () => {
    processSelection(FormatType.fillRandomHexColorCode);
  });

  const fillUniqueRandomHexColorCode = vscode.commands.registerCommand(
    'vscode-random-hex.fillUniqueRandomHexColorCode',
    () => {
      processSelection(FormatType.fillUniqueRandomHexColorCode);
    },
  );

  context.subscriptions.push(generateRandomHexColorCode, fillRandomHexColorCode, fillUniqueRandomHexColorCode);
}

export function deactivate() {}
