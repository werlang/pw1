#!/bin/sh

# This script runs the Marp watcher in a Node.js container.
# Run from the marp directory: ./watch.sh

LANG_VALUE="pt-BR.UTF-8"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

if ! command -v docker >/dev/null 2>&1; then
    echo "Erro: docker nao encontrado." >&2
    exit 1
fi

if [ ! -f "$SCRIPT_DIR/watch.js" ]; then
    echo "Erro: arquivo nao encontrado: $SCRIPT_DIR/watch.js" >&2
    exit 1
fi

exec docker run --rm -it \
    --user "$(id -u):$(id -g)" \
    --volume "$REPO_DIR:/workspace" \
    --workdir /workspace/marp \
    --env "LANG=$LANG_VALUE" \
    --env "HOME=/tmp" \
    node:24-alpine \
    node ./watch.js