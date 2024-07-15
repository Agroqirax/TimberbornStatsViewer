import json
import os


def get_file_path():
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Construct the path to the properties.json file
    json_path = os.path.join(script_dir, '..', 'src',
                             'res', 'static', 'properties.json')
    return json_path


def load_json(file_path):
    # Load the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data


def save_json(file_path, data):
    # Save the JSON data to the file
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)


def main():
    # Get the file path
    file_path = get_file_path()

    # Load the JSON data
    data = load_json(file_path)

    # Iterate over each entity in Entities
    for entity_name, entity in data['game']['Entities'].items():
        # Iterate over each version in Versions
        for version in entity.get('Versions', []):
            # Check if TemplateId ends with a specific string and Science key does not exist
            if version['TemplateId'].endswith('.IronTeeth') and 'Science' not in version:
                # Prompt the user to input the science amount
                sci = input(f"Enter the science amount for {
                            entity_name} (TemplateId: {version['TemplateId']}): ")
                # Add the Science key to the version
                version['Science'] = int(sci)
                # Save the updated JSON data after each prompt
                save_json(file_path, data)
                print(f"Updated {entity_name} with TemplateId {
                      version['TemplateId']}")


if __name__ == '__main__':
    main()
