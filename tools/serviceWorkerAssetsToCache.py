import os
import pyperclip

# Directory to scan
src_directory = './src'

# List to hold the paths of all files in the directory
file_list = []

# Walk through the directory and subdirectories
for root, dirs, files in os.walk(src_directory):
    for file in files:
        # Get the relative file path
        file_path = os.path.join(root, file)
        # Convert to relative path and replace backslashes with forward slashes
        relative_path = os.path.relpath(file_path, src_directory).replace('\\', '/')
        # Prefix each path with '../../../'
        prefixed_path = f'{relative_path}'
        file_list.append(prefixed_path)

# Format the list as a JSON array using single quotes
file_list_json = '[\n  ' + ',\n  '.join(f'\'{file}\'' for file in file_list) + '\n]'

# Copy the JSON array to the clipboard
pyperclip.copy(file_list_json)

# Print confirmation
print('\033[92m✓ File list copied to clipboard\033[0m')
