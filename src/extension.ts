import * as vscode from "vscode";
import { getPullImageCommand, getRunPynguinCommand } from "./utils/commands";

export function activate(context: vscode.ExtensionContext) {
  console.log("pynguin-runner is active!");

  let disposable = vscode.commands.registerCommand(
    "pynguin-runner.generateTests",
    (ctx) => {
      vscode.window.showInformationMessage(
        "Running Pynguin for the current module!"
      );

      const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
      const projectRoot = workspaceFolders[0]?.uri?.path;
      const filePath = vscode.window.activeTextEditor?.document.fileName;
      const relativeFilePath = filePath?.replace(projectRoot, "") ?? "";
      const fileName = relativeFilePath?.split("/").slice(-1).toString() ?? "";
      const fileFolder = relativeFilePath?.replace(fileName, "");

      if (!projectRoot) {
        vscode.window.showErrorMessage(
          "Could not determine the project root folder!"
        );
        return;
      }

      // TODO: Improve:
      // - extension: study addition of docker build ???
      // - extension: add pynguin version and timeout(maximum-search-time) to the user configs
      const terminal = vscode.window.createTerminal();
      terminal.sendText(getPullImageCommand());
      terminal.sendText(
        getRunPynguinCommand(projectRoot, fileFolder, fileName)
      );

      terminal.show(true);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
