#!/bin/bash

echo "Syncing build folder to host machine..."

rsync -av --delete ./dist/ /mnt/c/Users/silve/OneDrive/Desktop/Codes/2025/10-tabmark

echo "Sync Complete"