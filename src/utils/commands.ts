export const getPullImageCommand = () =>
  "docker pull andersonfernandes/pynguin_runner:latest";

export const getRunPynguinCommand = (
  fileFolder: string,
  fileName: string
): string =>
  [
    "docker run --rm",
    `-v .${fileFolder}:/code`,
    "-it pynguin_runner",
    `--module-name ${fileName.replace(".py", "")}`,
  ].join(" ");
