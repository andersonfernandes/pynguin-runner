import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("pynguin-runner is active!");

  let disposable = vscode.commands.registerCommand(
    "pynguin-runner.generateTests",
    (ctx) => {
      vscode.window.showInformationMessage(
        "Running Pynguin for the current module"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
