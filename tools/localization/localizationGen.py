import os
import requests
import json
import csv
from datetime import datetime
import glob
import shutil
from types import SimpleNamespace

cwd = os.path.dirname(os.path.abspath(__file__))


def download(url='https://docs.google.com/spreadsheets/d/e/2PACX-1vTklUaGuZIHZoYoa449Byin6c4d1nE9A67p0wq6gyei7IoVHor9rMQc5cLhk-5eAH3LNXuzEhHk_dIo/pub?gid=0&single=true&output=csv', path=rf'{cwd}\localization.csv'):
    response = requests.get(url)
    if not response.ok:
        print(f'\033[91m✕ Unable to get latest version of csv, status code: {
              response.status_code}\033[00m')
        exit()
    if not os.path.exists(path):
        with open(path, 'wb'):
            pass
    with open(path, 'wb') as file:
        file.write(response.content)
    print(f'\033[92m✓ Feteched latest version of csv from google sheets and saved to {
          path}\033[00m')


def generate(path=rf'{cwd}\localization.csv', dir=rf'{cwd}\build'):
    # Step 2: Create the output directory if it doesn't exist
    os.makedirs(dir, exist_ok=True)

    # Step 3: Remove existing .arb files from the output directory
    for file_name in os.listdir(dir):
        if file_name.endswith('.arb'):
            os.remove(os.path.join(dir, file_name))

    with open(path, mode='r', encoding='utf-8') as file:
        csvFile = csv.DictReader(file)

        # Get the list of languages from the header (excluding context and description)
        languages = csvFile.fieldnames[4:]

        # Initialize a dictionary to hold the content for each language
        data = {lang: {} for lang in languages}

        current_timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S%z')
        for lang in languages:
            # Extract country code from the language (assuming the format is app_CC)
            countryCode = lang

            # Add the required keys to the ARB data
            data[lang]["@@author"] = "Agroqirax"
            data[lang]["@@last_modified"] = current_timestamp
            data[lang]["@@locale"] = countryCode

        for row in csvFile:
            context = row['context']
            description = row['description']
            type = row['type']
            placeholders = row['placeholders']
            for lang in languages:
                data[lang][context] = row[lang].replace("'", "''")
                var = {}
                if description:
                    var['description'] = description
                if type:
                    var['type'] = type
                if placeholders:
                    # Step 1: Replace double quotes with single quotes and remove extra braces
                    json_str = row['placeholders'].replace('""', '"')

                    # Step 2: Parse the modified string as JSON
                    placeholders = json.loads(json_str)
                    var['placeholders'] = placeholders
                data[lang][f"@{context}"] = var

    # Step 5: Write the ARB files
    for lang in languages:
        arbFilePath = os.path.join(dir, f"{lang}.json")
        with open(arbFilePath, mode='w', encoding='utf-8') as arbFile:
            json.dump(data[lang], arbFile, ensure_ascii=False, indent=2)
    print(f'\033[92m✓ Generated json files from {path} in {dir}\033[00m')


def move(src, dest, ext):
    if not os.path.exists(dest):
        os.makedirs(dest)
    files = glob.iglob(os.path.join(src, ext))
    for file in files:
        if os.path.isfile(file):
            shutil.copy2(file, dest)
    print(f'\033[92m✓ Moved all files with format {
          ext} from {src} to {dest}\033[00m')


download(input('Csv url: '))

generate(rf'{cwd}\localization.csv', rf'{cwd}\build')

move(rf'{cwd}\build', rf'{cwd}\..\..\src\res\static\l10n', '*.json')
