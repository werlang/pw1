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

## Repository skills and documentation workflows
- The workspace contains custom skills under `.github/skills/` and they should be preferred when the request matches their scope.
- Use the `guia-readme` skill when creating, expanding, standardizing, or rewriting section READMEs into didactic reference guides in Portuguese.
- Use the `guia-readme-para-slides` skill when converting a README-guia into a Marp slide presentation for class, following the visual and structural pattern of `marp/content/00-introducao.md`.
- Slides generated from README content should summarize aggressively, keep one main idea per slide, and keep image slots as descriptions/placeholders when the final asset does not exist yet.
- For Marp slide work, follow the utility-only layout vocabulary documented in `marp/README.md` and `marp/themes/positioning.css`.
- Do not introduce or restore legacy Marp helper classes such as `grid-2`, `grid-3`, `span-2`, `vcenter`, `vbottom`, `vfill`, `align-center`, `align-left`, or `align-right`.
- Use the `skill-creator` skill when creating, reviewing, fixing, or reorganizing skills in `.github/skills/`, including frontmatter quality, trigger descriptions, and bundled resources.
- When updating or creating skills for this repository, prefer direct creation/editing inside `.github/skills/<skill-name>/` and keep bundled resources minimal and purposeful.

## Editing rules for agents
- Keep changes **local to the target exercise folder**; avoid cross-folder refactors.
- Match the simplicity level of surrounding code (beginner-friendly naming and structure).
- Do not introduce frameworks or new dependencies unless explicitly requested.
- When adding API behavior, keep JSON contract and field names consistent with existing files.
- Prefer small, explicit functions and straightforward control flow suitable for classroom explanation.
- For README and slide work, preserve the Portuguese-first didactic tone and prefer structure that helps the professor teach, not just material that looks complete.
- For README, slide, and didactic text work in Portuguese, always use correct PT-BR orthography and accentuation. Do not strip accents from prose, labels, or explanatory UI text unless there is a technical reason in code identifiers, file names, or URLs.
- In `marp/content/`, prefer utility classes such as `grid-cols-*`, `col-span-*`, `flex`, `items-*`, `justify-*`, `mx-auto`, `ml-auto`, `mr-auto`, `bleed-bottom`, `relative`, and `absolute`.
