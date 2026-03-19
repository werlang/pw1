# Workflow Patterns

Use these patterns when writing or revising a skill.

## 1. Direct-edit workflow

Use when the skill is small and the task is well understood.

1. inspect the existing skill folder
2. identify missing triggers, broken references, or bloated instructions
3. update `SKILL.md`
4. add only the supporting files that are actually needed
5. validate that every referenced file exists

## 2. Expand-with-references workflow

Use when `SKILL.md` is getting long or supports multiple variants.

1. keep the core workflow in `SKILL.md`
2. move detailed rules, checklists, or patterns into `references/`
3. mention those files explicitly from `SKILL.md`
4. avoid duplicating the same guidance in multiple places

## 3. Repair workflow

Use when the skill already exists but is unreliable.

Check for:

- vague descriptions that will not trigger reliably
- references to files that do not exist
- body text repeating what belongs in the description
- resource folders with placeholders that are never used
- instructions that do not match the repository reality

## 4. Review standard

Treat a skill as ready only when:

- `name` matches the folder name
- `description` says what the skill does and when to use it
- `SKILL.md` can be followed without guessing missing steps
- resource files are small, specific, and referenced on purpose
- the final structure is simpler than the previous one, or clearly more useful