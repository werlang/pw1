## AI Commit Message Instructions

Always generate exactly one commit message using **Semantic Commit** format.
Keep it short, direct, and specific to the staged changes.

### Required format

`<type>(<scope>): <short summary>`

- Use lowercase for `type` and `scope`.
- Keep the summary in imperative mood, such as `add`, `fix`, `update`, or
  `remove`.
- Keep the full first line at 72 characters or less when practical.
- Never omit the scope.
- Do not add emojis.
- Do not add a body or footer unless explicitly requested.
- Do not output multiple alternatives, bullet lists, explanations, or duplicate
  entries.

### Inspect staged changes first

Before choosing the message, inspect the staged diff and staged file list:

- Use staged changes as the source of truth.
- Ignore unstaged and untracked changes unless the user explicitly says they are
  part of the commit.
- Identify the primary purpose of the staged changes before choosing `type` or
  `scope`.
- If staged changes are unrelated, choose the purpose that best describes the
  commit as a whole. Do not emit multiple commit messages.

### Choose the type

Use the highest matching category in this order:

1. `fix`: correct broken behavior, bad output, crashes, incorrect state,
   security issues, invalid validation, or failing flows.
2. `feat`: add user-facing behavior, supported options, workflows, APIs,
   screens, commands, or capabilities.
3. `refactor`: restructure implementation without changing observable
   behavior.
4. `test`: add or update tests, test fixtures, test helpers, or test tooling.
5. `docs`: change documentation, prompts, instructions, comments intended as
   documentation, or examples only.
6. `style`: change formatting, whitespace, lint-only style, spelling, or naming
   without behavior changes.
7. `chore`: change dependencies, build tooling, CI, scripts, generated assets,
   repository maintenance, environment templates, or other support files.

When a change touches more than one category, choose the type that describes
the primary user-visible or project-visible purpose, not every file that
changed.

### Choose the scope

Infer scope from the staged paths, surrounding project structure, and purpose of
the change. Use the most specific stable module, feature, package, app, service,
or layer name available.

Prefer these common scopes when they fit:

- `api`: backend HTTP API routes, controllers, middleware, schemas, or API
  contracts.
- `auth`: authentication, authorization, sessions, passwords, permissions, or
  access control.
- `db`: database schema, migrations, seeds, queries, models, or persistence.
- `web`: frontend pages, routes, templates, browser behavior, or UI state.
- `ui`: shared visual components, styling systems, layout, or interaction
  polish.
- `cli`: command-line interfaces, arguments, terminal output, or CLI workflows.
- `config`: environment examples, runtime configuration, feature flags, project
  settings, or ignore files.
- `docker`: Dockerfiles, Compose files, container runtime, or image setup.
- `ci`: GitHub Actions, pipelines, release automation, or check configuration.
- `deps`: dependency manifests, lockfiles, package updates, or runtime version
  pins.
- `docs`: README files, guides, prompts, agent instructions, or other
  documentation.
- `tests`: tests, fixtures, snapshots, mocks, or test utilities.
- `repo`: repository-wide maintenance or changes that do not fit one primary
  area.

If a project has clearer local names, use them instead of the common scopes.
Examples include an app name, package name, bounded context, feature directory,
service name, or command name.

If several scopes are affected, choose the scope that best describes the main
reason for the commit. Use `repo` only when no single area is clearly primary.

### Good examples

- `feat(api): add event date range filter`
- `fix(auth): handle expired password sessions`
- `docs(readme): update docker setup steps`
- `refactor(web): simplify dashboard state flow`
- `test(cli): cover invalid input handling`
- `chore(deps): bump python dependencies`
- `chore(ci): run tests on pull requests`
- `style(ui): normalize button spacing`

### Final output rule

Return only the final commit message line unless the user explicitly asks for
more detail. The output must contain one semantic commit entry and nothing else.
