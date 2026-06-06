# rika-quiz Codex Notes

## Token-saving workflow

- Keep user-facing replies in Japanese.
- Before editing, inspect only the relevant part of `index.html` with targeted searches.
- Do not read or paste the full `index.html` unless a broad refactor truly requires it.
- Prefer `Select-String`, `git diff --stat`, and narrow line windows over full file dumps.
- When changing UI behavior, search for the component or visible Japanese label first.
- When changing question content, search for the exact unit, grade, field, or question text.
- Avoid printing large diffs in chat; summarize changed areas instead.

## Current app shape

- The app is a static GitHub Pages app.
- Main file: `index.html`
- Keep the public URL unchanged.
- Browser history and quiz records are stored in `localStorage`.

## Future refactor plan

If larger edits become frequent, split the app in this order:

1. Move question arrays and `data` construction into `quiz-data.js`.
2. Move shared constants and storage helpers into `app-config.js`.
3. Keep `index.html` focused on layout and React components.

Use normal static script tags so GitHub Pages can serve the app without a build step.
