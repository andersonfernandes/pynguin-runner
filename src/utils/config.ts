import * as vscode from "vscode";

export const getConfig = (key: string) =>
  vscode.workspace.getConfiguration("pynguin").get(key);
