# Copilot Instructions for `pw1`

## Project intent
- This repository is a **teaching codebase** for Programação Web I (IFSUL), with examples/exercises grouped by topic and class.
- Prefer solutions that are **clear for students** over clever abstractions.
- Treat new or edited code as instructional material that may be written, read, and maintained by high-school students.

## Big picture architecture
- Topic folders (`00-introducao` ... `12-php-arquivos`, plus `99-layout-utils`): examples and exercises grouped by class, one folder per concept (e.g. `04-dom/lista-tarefas/`).
- `exemplos/`: instructor reference implementations, from basic DOM to PHP + MySQL + session flows.
- `exercicios/`: student exercise versions, usually mirroring `exemplos` naming.
- `provas/<ano>/`: exam snapshots, often with `public/` and `solution/` side by side.
- Most folders are intentionally **self-contained mini-projects** (`index.html` + `script.js` + `style.css` and optional PHP files).
- `teste/`: the folder Apache serves in class (`PUBLIC_DIR=./teste` in `.env`): the 5 CRUD pages, a colocated JSON API (`teste/api/`) and shared UI pieces in `teste/componentes/` (`base.css`, toast, modal). See `teste/README.md`.

## Frontend patterns used here
- Vanilla JS with direct DOM APIs (`querySelector`, `addEventListener`, `textContent`, `insertAdjacentHTML`).
- ES modules via `<script type="module" ...>` are common.
- Keep selectors and IDs in Portuguese when already present (e.g., `#btn-finalizar`, `#status`).
- Example DOM flow: `04-dom/lista-tarefas/script.js`.
- Avoid `data-*` attributes and `dataset` in didactic exercise code. For dynamic lists, prefer `createElement`, `append` / `appendChild`, and direct `addEventListener` bindings on the created elements.
- Dynamic list rendering follows one fixed shape (see `teste/lista/script.js`): `createElement` for the item node → `innerHTML` for its **content only** → `addEventListener` inside the same loop, with the item already in scope → `append` to the container. Never accumulate HTML in a string (`let html = ''; html += ...`) and assign it once, and never identify the clicked item by `querySelectorAll` + index.
- Talk to the user through the project's own components: `showToast()` for messages and `await confirmar()` from `teste/componentes/modal.js` for decisions, instead of native `alert()` / `confirm()`. Older exercises under `exercicios/fetch/` still use native `confirm()`; leave them as they are.

## Backend/API patterns used here
- PHP endpoints are colocated with the exercise and usually return JSON.
- Typical response shape:
  - Error: `{"error": true, "message": "..."}`
  - Success: `{"error": not present, "chave_relevante": ..., "message": "..."}`
- Use `require "connection.php"`, prepared statements, and `header('Content-Type: application/json')`.
- Example endpoints: `exemplos/ex10.2/getusers.php`, `exemplos/ex10.2/insertuser.php`.
- Session guard pattern: `exemplos/ex13.1/api/session.php`.

## Environment and workflows
- No Node/Composer/Python build pipeline at repo root.
- Static lessons: open the target HTML directly. There is no launch config checked in (`.vscode/` is empty), and no build step to run.
- To check a page visually, prefer `chrome-devtools` `take_screenshot` or reading the DOM with `evaluate`. Playwright MCP screenshots have been observed to come back one navigation late; DOM readings were always reliable.
- Docker stack (`compose.yaml`) provides MySQL + Apache/PHP for backend lessons.
- `compose.yaml` expects `PUBLIC_DIR`; if missing in `.env`, pass it inline.

```bash
docker compose up -d
PUBLIC_DIR=./exemplos/ex13.1 docker compose up -d
```

## Repository skills and documentation workflows
- The workspace contains custom skills under `.agents/skills/` and they should be preferred when the request matches their scope.
- Use the `codigo-didatico-ptbr` skill when creating, revising, refactoring, or explaining source code so the result stays beginner-friendly, educational, well documented, and with comments in PT-BR.
- Use the `guia-readme` skill when creating, expanding, standardizing, or rewriting section READMEs into didactic reference guides in Portuguese.
- Use the `guia-readme-para-slides` skill when converting a README-guia into a Marp slide presentation for class, following the visual and structural pattern of `marp/content/00-introducao.md`.
- Slides generated from README content should summarize aggressively, keep one main idea per slide, and keep image slots as descriptions/placeholders when the final asset does not exist yet.
- For Marp slide work, follow the utility-only layout vocabulary documented in `marp/README.md` and `marp/themes/positioning.css`.
- Do not introduce or restore legacy Marp helper classes such as `grid-2`, `grid-3`, `span-2`, `vcenter`, `vbottom`, `vfill`, `align-center`, `align-left`, or `align-right`.
- Use the `skill-creator` skill when creating, reviewing, fixing, or reorganizing skills in `.agents/skills/`, including frontmatter quality, trigger descriptions, and bundled resources.
- When updating or creating skills for this repository, prefer direct creation/editing inside `.agents/skills/<skill-name>/` and keep bundled resources minimal and purposeful.

## Editing rules for agents
- Keep changes **local to the target exercise folder**; avoid cross-folder refactors.
- Match the simplicity level of surrounding code (beginner-friendly naming and structure).
- For source code, prefer explicit step-by-step logic, comments in PT-BR, and documentation choices that help classroom explanation.
- Do not introduce frameworks or new dependencies unless explicitly requested.
- When creating multiple exercises, avoid superficial theme swaps over the same flow. Plan genuinely different interactions and state shapes, such as grids, rankings, staged flows, timers, progress trackers, simulations, or quizzes.
- When adding API behavior, keep JSON contract and field names consistent with existing files.
- Prefer small, explicit functions and straightforward control flow suitable for classroom explanation.
- Code must read like something the student typed during class: short PT-BR comments, no `try/catch` around every call, no generic helpers, no defensive layers that teach nothing. Avoid the "polished generated code" look.
- In frontend JavaScript for exercises, do not use `data-*` attributes as action carriers. Build dynamic UI with DOM node creation and attach events directly to those nodes.
- For README and slide work, preserve the Portuguese-first didactic tone and prefer structure that helps the professor teach, not just material that looks complete.
- For README, slide, and didactic text work in Portuguese, always use correct PT-BR orthography and accentuation. Do not strip accents from prose, labels, or explanatory UI text unless there is a technical reason in code identifiers, file names, or URLs.
- In `marp/content/`, prefer utility classes such as `grid-cols-*`, `col-span-*`, `flex`, `items-*`, `justify-*`, `mx-auto`, `ml-auto`, `mr-auto`, `bleed-bottom`, `relative`, and `absolute`.
