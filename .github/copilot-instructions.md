# Copilot Instructions for `pw1`

## Project intent
- This repository is a **teaching codebase** for Programação Web I (IFSUL), with examples/exercises grouped by topic and class.
- Prefer solutions that are **clear for students** over clever abstractions.

## Big picture architecture
- `public/`: browser-ready lesson demos (e.g., `public/02-dom/tarefas`).
- `exemplos/`: instructor reference implementations, from basic DOM to PHP + MySQL + session flows.
- `exercicios/`: student exercise versions, usually mirroring `exemplos` naming.
- `provas/<ano>/`: exam snapshots, often with `public/` and `solution/` side by side.
- Most folders are intentionally **self-contained mini-projects** (`index.html` + `script.js` + `style.css` and optional PHP files).

## Frontend patterns used here
- Vanilla JS with direct DOM APIs (`querySelector`, `addEventListener`, `textContent`, `insertAdjacentHTML`).
- ES modules via `<script type="module" ...>` are common.
- Keep selectors and IDs in Portuguese when already present (e.g., `#btn-finalizar`, `#status`).
- Example DOM flow: `public/02-dom/tarefas/script.js`.

## Backend/API patterns used here
- PHP endpoints are colocated with the exercise and usually return JSON.
- Typical shape is `{"status":"OK"|"error", "result":..., "message":...}`.
- Use `require "connection.php"`, prepared statements, and `header('Content-Type: application/json')`.
- Example endpoints: `exemplos/ex10.2/getusers.php`, `exemplos/ex10.2/insertuser.php`.
- Session guard pattern: `exemplos/ex13.1/api/session.php`.

## Environment and workflows
- No Node/Composer/Python build pipeline at repo root.
- Static lessons: open the target HTML directly or use VS Code launch config (`.vscode/launch.json`, currently points to `teste/index.html`).
- Docker stack (`compose.yaml`) provides MySQL + Apache/PHP for backend lessons.
- `compose.yaml` expects `PUBLIC_DIR`; if missing in `.env`, pass it inline.

```bash
docker compose up -d
PUBLIC_DIR=./exemplos/ex13.1 docker compose up -d
```

## Editing rules for agents
- Keep changes **local to the target exercise folder**; avoid cross-folder refactors.
- Match the simplicity level of surrounding code (beginner-friendly naming and structure).
- Do not introduce frameworks or new dependencies unless explicitly requested.
- When adding API behavior, keep JSON contract and field names consistent with existing files.
- Prefer small, explicit functions and straightforward control flow suitable for classroom explanation.
