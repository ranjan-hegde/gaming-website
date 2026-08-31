# Agent Instructions

## Project Context

This is a Next.js 16.3.3 project using React, TypeScript, Tailwind CSS, GSAP, Lenis, and Lucide React.

Before making significant changes, read:
- `docs/architecture.md`
- `docs/current-state.md`
- `docs/decisions.md`

For debugging or previously encountered issues, check:
- `docs/debugging.md`

## Memory Discipline

Treat the files under `docs/` as persistent project memory.

When making a significant architectural decision:
1. Update `docs/decisions.md`.
2. Record the reason for the decision.
3. Record important rejected alternatives when relevant.

When completing a significant feature:
1. Update `docs/current-state.md`.
2. Record what changed.
3. Record remaining limitations or follow-up work.

When discovering a recurring bug or non-obvious fix:
1. Update `docs/debugging.md`.
2. Record the cause and reliable solution.

Do not record trivial implementation details.
Do not duplicate information unnecessarily.
Do not replace existing project knowledge with guesses.

## Before Coding

1. Inspect the relevant files.
2. Read the relevant project-memory documents.
3. Understand the existing architecture.
4. Identify dependencies and side effects.
5. Make the smallest clean change that solves the task.

Do not rewrite working code without a reason.

## Next.js

This project uses Next.js 16.3.3.

Before relying on Next.js behavior that may have changed between versions, consult the installed documentation under:

`node_modules/next/dist/docs/`

Do not assume behavior from older Next.js versions.

## Dependencies

Do not add a dependency when the existing stack can solve the problem cleanly.

If adding a dependency is necessary:
- explain why it is needed
- prefer a well-maintained package
- avoid duplicate libraries that solve the same problem

## Animation

GSAP is used for complex animation and timeline control.

Lenis is used for smooth scrolling.

Before introducing another animation or smooth-scroll library, check the existing implementation and avoid creating overlapping animation systems.

## Code Quality

Prefer:
- clear component boundaries
- reusable logic
- predictable state management
- minimal duplication
- accessible UI
- proper cleanup of animations and event listeners

Do not:
- create unnecessary abstractions
- silently change unrelated behavior
- leave debugging code in production
- remove existing functionality just to make a task easier

## Verification

After significant changes:
1. Run the relevant checks.
2. Fix errors instead of ignoring them.
3. Check affected UI behavior when possible.
4. Update project memory if the architecture or project state changed.

## Agent Handoff

At the end of a substantial task, leave enough information for another agent to continue without reconstructing the entire conversation.

Update:
- `docs/current-state.md`
- `docs/decisions.md` if decisions were made
- `docs/debugging.md` if important problems were discovered
