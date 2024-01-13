#!/bin/bash

# Source directory
source_dir="/home/valentinottaviano/Documents/Dropbox/Collage-Notes"

# Destination directory
destination_dir="/home/valentinottaviano/Documents/quartz/content"

# Use rsync to copy files from the source to the destination
rsync -av --delete "$source_dir/" "$destination_dir/"

# Explanation:
# - -a: Archive mode, which preserves permissions and other attributes.
# - -v: Verbose mode, so you can see what's being copied.
# - --delete: This option deletes any files in the destination directory that are not in the source directory.

echo "Files copied successfully."

# Change to the destination directory
cd "$destination_dir"
cd ..
# Add all changes to Git
git add .

# Commit the changes with a message
git commit -m "Updated with new files from Collage-Notes"

# Push the changes to the GitHub repository
git push

echo "GitHub repository updated successfully."

# End of the script

