import { exec } from "child_process";
import { getConfig } from "./config";

export const validateDockerInstallation = async (): Promise<boolean> => {
  try {
    await new Promise((resolve, reject) => {
      exec("docker info", (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }

        resolve(stdout ? stdout : stderr);
      });
    });

    return true;
  } catch (e) {
    return false;
  }
};

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
