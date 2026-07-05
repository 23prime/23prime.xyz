---
name: i18n-translate
description: Use when frontend/src/i18n/locales/ja/translation.json has been edited and the corresponding keys in en/translation.json need to be added or updated to match.
---

# i18n Translate

## Overview

Generates or updates English translation keys in `frontend/src/i18n/locales/en/translation.json`
from uncommitted changes to the Japanese source `frontend/src/i18n/locales/ja/translation.json`,
touching only the keys that changed.

## When to use

- After editing `ja/translation.json` (new UI text, wording changes) and before committing.
- Not for bulk-regenerating the whole file — this is a diff-driven update, not a full retranslation.

## Workflow

1. Diff the ja file against the last commit to find added/changed key paths:

   ```bash
   git diff HEAD -- frontend/src/i18n/locales/ja/translation.json
   ```

   If there is no uncommitted diff, ask the user which commit/branch to diff against.

2. For each added or changed key path, read the ja value and produce a natural, idiomatic
   English translation — not a literal word-for-word one. Match the tone, punctuation, and
   capitalization conventions already used elsewhere in `en/translation.json`.
3. Preserve `{{placeholder}}` interpolation tokens exactly as they appear in the ja value.
4. Edit `en/translation.json` at the same key path:
   - New key in ja → insert into en at the same position (same key order/nesting).
   - Changed value in ja → update only that key's value in en.
   - Unchanged ja keys → leave the corresponding en value untouched.
5. Run `mise run fe-check` to confirm lint/type-check/build succeed.
6. Report which keys were added or changed in `en/translation.json`.

## Common mistakes

- Overwriting the whole en file instead of only the changed keys.
- Literal translation that ignores existing English tone/style in the file.
- Breaking `{{var}}` placeholders during translation.
- Changing key order/nesting so it no longer mirrors the ja file.
