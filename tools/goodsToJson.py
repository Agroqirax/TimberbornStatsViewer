import csv
import json

# Step 2: Define the input and output file names
input_file = 'tools/goods.csv'
output_file = 'tools/build/goods.json'

# Step 3: Initialize an empty dictionary to store the JSON data
json_data = {}

# Step 4: Read the CSV file
with open(input_file, mode='r', newline='') as csvfile:
    csv_reader = csv.reader(csvfile)
    header = next(csv_reader)  # Skip the header row
    for row in csv_reader:
        ProducedBy = None
        if row[5]:
            ProducedBy = row[5].replace('""', '"')
            ProducedBy = json.loads(ProducedBy)
            
        RequiredBy = None
        if row[6]:
            RequiredBy = row[6].replace('""', '"')
            RequiredBy = json.loads(RequiredBy)
            
        StoredIn = None
        if row[7]:
            StoredIn = row[7].replace('""', '"')
            StoredIn = json.loads(StoredIn)

        Id = row[0]
        json_data[Id] = {
            "Id": row[0],
            "Name": row[1],
            "TranslationId": row[3],
            "Type": row[4],
            "ProducedBy": ProducedBy,
            "RequiredBy": RequiredBy,
            "StoredIn": StoredIn
        }

# Step 5: Write the JSON data to a file
with open(output_file, mode='w') as jsonfile:
    json.dump(json_data, jsonfile, indent=2)

print(f'CSV data has been successfully converted to JSON and saved to {
      output_file}')
