#!/bin/bash

# ------------------------------------
# This command removed old deployments, and keeps only current one
# ------------------------------------

read -p "Did you export credentials or run 'wrangler login'? (y/n): " ans
[ "$ans" != "y" ] && echo "Export credentials first." && exit 1

# Get IDs as array using jq (newest first)
IDS=($(wrangler pages deployment list --json | jq -r '.[].Id'))

[ ${#IDS[@]} -le 1 ] && echo "Nothing to delete." && exit 0

echo "Keeping: ${IDS[0]}"
for id in "${IDS[@]:1}"; do
	echo "Deleting: $id"
	wrangler pages deployment delete "$id" --force
done

echo "Done!"
echo ""
echo "Remaining deployments:"
wrangler pages deployment list
