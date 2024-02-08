import * as vscode from "vscode";

const getConfig = (key: string) =>
  vscode.workspace.getConfiguration("pynguin").get(key);

export const getPullImageCommand = () =>
  `docker pull andersonfernandes/pynguin_runner:${getConfig("version")}`;

export const getRunPynguinCommand = (
  rootFolder: string,
  fileFolder: string,
  fileName: string
): string =>
  [
    "docker run --rm",
    `-v ${rootFolder}:/project`,
    `-v .${fileFolder}:/module`,
    `-it andersonfernandes/pynguin_runner:${getConfig("version")}`,
    `--module-name ${fileName.replace(".py", "")}`,
    `--maximum-search-time ${getConfig("maximumSearchTime")}`,
  ].join(" ");
