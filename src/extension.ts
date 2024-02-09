import * as vscode from "vscode";
import {
  getPullImageCommand,
  getRunPynguinCommand,
  validateDockerInstallation as isDockerInstalled,
} from "./utils/docker";

export function activate(context: vscode.ExtensionContext) {
  console.log("pynguin-runner is active!");

  let disposable = vscode.commands.registerCommand(
    "pynguin-runner.generateTests",
    async () => {
      if (!(await isDockerInstalled())) {
        vscode.window.showErrorMessage(
          "You need to have docker installed in order to run Pynguin."
        );
        return;
      }

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

      vscode.window.showInformationMessage(
        "Running Pynguin for the current module."
      );

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
