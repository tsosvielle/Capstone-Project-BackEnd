#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sightings"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "sighting": {
      "title": "'"${TITLE}"'",
      "text": "'"${TEXT}"'",
      "date": "'"${DATE}"'",
      "location": "'"${LOCATION}"'"
    }
  }'

echo
