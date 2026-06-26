# VEDA OS Architecture Notes

## Starting Architecture

The prototype begins as a static browser app:

- `index.html`: document shell.
- `src/styles.css`: visual system and responsive layout.
- `src/main.js`: state, seed data, rendering, and interactions.

This keeps iteration fast while the domain model is still forming.

## Expected Evolution

1. Static prototype with seed data.
2. Local persistence via IndexedDB or SQLite-backed desktop shell.
3. Structured domain model for projects, decisions, rituals, signals, and notes.
4. AI-assisted workflows for planning, summarization, review, and next-action generation.
5. Optional sync and collaboration.

## Design Constraints

- VEDA should be quiet enough for daily use.
- Screens should prioritize scanning and repeated action.
- The system should maintain context over time.
- AI outputs should be inspectable, editable, and tied to source material.

## Candidate Stack Later

- App: TypeScript with a component framework once interactions justify it.
- Persistence: local-first store, likely SQLite or IndexedDB initially.
- AI: provider-abstracted workflow services with durable prompts and evals.
- Sync: optional, explicit, and privacy-aware.
