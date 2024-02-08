#!/usr/bin/env bash

# This script was created using pynguin's script as reference https://github.com/se2p/pynguin/blob/0.34.0/pynguin-docker.sh

CODE_DIR="/code"
OUTPUT_DIR="${CODE_DIR}/pynguin_tests"

function help_message {
  echo ""
  echo "pynguin-docker.sh"
  echo "Script to run Pynguin inside a Docker container"
  echo "This script can only be used inside a Docker container, it checks that certain"
  echo "mounts are set, installs possible dependencies of a project for Pynguin,"
  echo "executes Pynguin and provides the results."
  echo "In order to use this, you have to provide the code mount point within your Docker run"
  echo "command:"
  echo "docker run \\"
  echo "    -v /path/to/code:${CODE_DIR} \\"
  echo "    ..."
  echo ""
}

function error_echo {
  RED="\033[0;31m"
  NC="\033[0m"
  echo -e "${RED}ERROR: ${1}${NC}\n"
}


# Check if we are in a running Docker container.
if [[ ! -f /.dockerenv ]]
then
  error_echo "This script is only supposed to be run within a Docker container!"
  error_echo "You cannot run it as a standalone script!"
  help_message
  exit 1
fi

# Check if the /code mount point is present and not empty
if [[ ! -d ${CODE_DIR} || -z "$(ls -A ${CODE_DIR})" ]]
then
  error_echo "You need to specify a mount to ${CODE_DIR}"
  help_message
  exit 1
fi

cd ${CODE_DIR}
mkdir -p ${OUTPUT_DIR}

if test -f "${CODE_DIR}/package.txt"; then
  # Install dependencies by installing the package
  pip install -r "${CODE_DIR}/package.txt"
fi

# Execute Pynguin with all arguments passed to this script
pynguin -v --project-path ${CODE_DIR} --output-path ${OUTPUT_DIR} --report-dir ${CODE_DIR} "$@"