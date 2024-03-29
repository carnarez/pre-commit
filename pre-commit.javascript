#!/bin/bash

set -e

if [ "$(docker images | grep -c "${PWD##*/}/pre-commit")" == "0" ]; then
  echo -e "$(tput bold)Building the required ${PWD##*/}/pre-commit image:$(tput sgr0)\n"
  docker build --build-arg username=$(whoami) --tag "${PWD##*/}/pre-commit" .pre-commit
else
  echo "Updating and using existing ${PWD##*/}/pre-commit image."
  docker build --build-arg username=$(whoami) --quiet --tag "${PWD##*/}/pre-commit" .pre-commit 1>/dev/null
fi

eslint_cache="/tmp/pre-commit/${PWD##*/}/eslint_cache"

if [ ! -d "$eslint_cache" ]; then mkdir -p "$eslint_cache"; fi

docker run --rm \
           --user $(id -u):$(id -g) \
           --volume "$PWD":/usr/src \
           --volume /etc/group:/etc/group:ro \
           --volume /etc/passwd:/etc/passwd:ro \
           --volume /etc/shadow:/etc/shadow:ro \
           --volume "/tmp/pre-commit/${PWD##*/}/eslint_cache":/tmp/eslint_cache \
           pre-commit/"${PWD##*/}"
