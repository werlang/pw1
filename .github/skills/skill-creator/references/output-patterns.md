# Output Patterns

Use these patterns to keep skills concise and effective.

## Frontmatter pattern

Write only:

```yaml
---
name: skill-name
description: Clear statement of what the skill does and when to use it.
---
```

## Description pattern

A good description usually includes:

1. the artifact or workflow the skill handles
2. the main outcomes it supports
3. trigger phrases or request shapes that should activate it

Example pattern:

`Transform X into Y with Z constraints. Use when Agent needs to create, revise, debug, or standardize ...`

## Body pattern

Prefer this order:

1. purpose of the skill
2. required inputs or context
3. repository or environment constraints
4. step-by-step workflow
5. quality checks
6. references to bundled resources

## Resource pattern

Add a bundled file only if at least one of these is true:

- it prevents repeating the same instructions in `SKILL.md`
- it captures a reusable checklist or template
- it documents repository-specific behavior that is easy to forget

Avoid adding files that only restate obvious information.