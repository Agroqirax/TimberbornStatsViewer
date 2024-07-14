# Timberborn Stats Viewer

The Timberborn Stats Viewer aims to give users insight into their Timberborn save file. The project makes it easy to see if your beavers are producing too much or too little of a good, how much they planted, and more.

## Features

- **Save Thumbnail:** Displays the thumbnail of your save file.
- **Statistics:** Basic stats and details such as the timestamp, number of beavers, map name and size, etc...
- **Production Information:** Various stats such as production amounts, required amounts, and storage amounts for each good.
- **Planting Information:** Details how much you have marked to be planted per crop/tree, how much has been planted, and how much has grown.
- **Recent Notifications:** Displays recent in-game notifications.
- **Mod Information:** Lists the mods used in the save.
- **Localization:** Supports multiple languages with translations for all supported languages.

## Installation and Usage

### Using the Site

You can use the site by visiting [Timberborn Stats Viewer](https://Agroqirax.github.io/TimberbornStatsViewer).

### Hosting the Project

For developers who wish to host the project themselves or help developing, clone the repo and host it using a webserver of your choice.

```sh
git clone https://github.com/Agroqirax/TimberbornStatsViewer.git
cd TimberbornStatsViewer
```

# Contributing

See `/.github/CONTRIBUTING.md`

## Localization

This project is localized with the `data-translate` property.
The text in data-translate refers to the context column in the localization spreadsheet, which must be in lowerCamelCase.

Languages Supported: The site is translated into the same languages as the game (en, de, es, fr, it, ja, ko, pl, pt, ru, th, tr, uk, zh) and nl.
Translation Files: The translations are defined in `/src/res/static/l10n`.

Google Sheets is used for reference due to the =GOOGLETRANSLATE function.
To edit, please copy [the spreadsheet](https://docs.google.com/spreadsheets/d/1kcJ1upHCf6Abe9_b4EIYnWTUTxNDetIpvz8H2ajMg38/edit?usp=sharing) and modify your own copy.

Conversion Tool: `/tools/localization` contains a Python script to convert a CSV to the JSON translation files.

# License

This project is licensed under the MIT License. See the LICENSE.md file for more details.

# Contact

## Bug Reports

Users can submit bugs or problems trough the [google form](https://forms.gle/NyCKFR2kQGNfsajN9)

Developers can create an issue on the [repository](https://github.com/Agroqirax/TimberbornStatsViewer/issues)

The author can be contacted at [rickiedev60@gmail.com](mailto:rickiedev60gmail.com).
