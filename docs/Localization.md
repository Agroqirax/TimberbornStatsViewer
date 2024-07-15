# Localization

This project is localized with the `data-translate` property.
The text in data-translate refers to the context column in the localization spreadsheet, which must be in lowercamelcase.

## Supported languages

The site is translated into the same languages as the game (`en`, `de`, `es`, `fr`, `it`, `ja`, `ko`, `pl`, `pt`, `ru`, `th`, `tr`, `uk`, `zh`) and `nl`.

The translations are defined in `/src/res/static/l10n`.

Each language has a json file named after it's 2-letter iso language code. Translations are defined `"keyword": "translation"`, and optionally have more data in `"@keyword"`.

There is a google sheet available with the current translations.
To edit, please copy [the spreadsheet](https://docs.google.com/spreadsheets/d/1kcJ1upHCf6Abe9_b4EIYnWTUTxNDetIpvz8H2ajMg38/edit?usp=sharing) and modify your own copy.

# Tools

`/tools/localization` contains a Python script to convert a CSV to the JSON translation files.
