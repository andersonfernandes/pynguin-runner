export const getPullImageCommand = () =>
  "docker pull andersonfernandes/pynguin_runner:latest";

export const getRunPynguinCommand = (
  rootFolder: string,
  fileFolder: string,
  fileName: string
): string =>
  [
    "docker run --rm",
    `-v ${rootFolder}:/project`,
    `-v .${fileFolder}:/module`,
    "-it andersonfernandes/pynguin_runner:latest",
    `--module-name ${fileName.replace(".py", "")}`,
  ].join(" ");
