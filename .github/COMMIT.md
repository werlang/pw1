## AI Commit Message Instructions

Always generate commit messages using **Semantic Commit** format and keep them short and concise.

### Required format

`<type>(<scope>): <short summary>`

- Use lowercase for `type` and `scope`.
- Keep summary in imperative mood (e.g., "add", "fix", "update").
- Summary should be clear and brief (preferably <= 72 characters).
- Do not omit the scope if it can be specified. Use a general scope if unsure.
- Do not add emojis.
- Do not add unnecessary body/footer unless explicitly requested.

### Allowed semantic types

- `feat`: new feature related to app functionality
- `fix`: bug fix
- `refactor`: internal code change without behavior change
- `docs`: documentation-only change
- `style`: formatting/style-only change
- `test`: tests added/updated
- `chore`: tooling, dependencies, maintenance, setup, or other non-code changes

### Scope guidance

- Always specify the specific module or component affected by the change in parentheses after the type (e.g., `feat(api)`, `fix(auth)`, `docs(setup)`).
- Never omit the scope. If unsure, use a general scope like `core` or `app`.
- Use the name of the module or component affected (e.g., `api`, `web`, `auth`, `events`).
- If multiple modules are affected, choose the most relevant one or use a general scope like `core`.

### Good examples

- `feat(api): add event date range filter`
- `fix(auth): handle missing bearer token`
- `docs(setup): update Docker Compose instructions`
- `refactor(web): simplify event listing logic`
- `style(api): format code with Prettier`
- `chore(web): bump webpack dev dependency`

### Commit behavior rule

When auto-generating commits, always use this semantic format and keep the message minimal, direct, and descriptive, yet human friendly. Avoid unnecessary technical jargon or verbosity. Focus on the essence of the change in a clear and concise manner.
