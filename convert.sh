#!/bin/bash

folder_path="/c/Users/mario/OneDrive/Desktop/kyklos2/contracts"

# Find all .ts and .tsx files recursively
files=$(find "$folder_path" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.tsx" \))

# Loop through each file
for file in $files; do
    # Convert line endings from CRLF to LF
    sed -i 's/\r$//' "$file"
    echo "Converted line endings for $file"
done