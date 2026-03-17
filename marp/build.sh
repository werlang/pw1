#!/bin/bash

# This script builds the Marp presentation slides from the content directory.
# Run from the marp directory: ./build.sh

CONTENT_DIR="./content"
THEME_FILE="./themes/ifsul.css"
LANG="pt-BR.UTF-8"

if ! command -v docker >/dev/null 2>&1; then
    echo "Erro: docker nao encontrado." >&2
    exit 1
fi

if [ ! -d "$CONTENT_DIR" ]; then
    echo "Erro: diretorio nao encontrado: $CONTENT_DIR" >&2
    exit 1
fi

if [ ! -f "$THEME_FILE" ]; then
    echo "Erro: tema nao encontrado: $THEME_FILE" >&2
    exit 1
fi

# Run Marp CLI in a Docker container.
docker run --rm \
    --volume .:/app \
    --workdir /app \
    --env "LANG=$LANG" \
    marpteam/marp-cli \
    --theme-set /app/themes/ifsul.css \
    --input-dir /app

# Move generated HTML files to the public directory.
# marp/content/<name>.html -> <name>/slide/index.html
for file in "$CONTENT_DIR"/*.html; do
    name=$(basename -- "$file" .html)
    target_dir="../$name/slide"

    mkdir -p -- "$target_dir"
    mv -- "$file" "$target_dir/index.html"
done