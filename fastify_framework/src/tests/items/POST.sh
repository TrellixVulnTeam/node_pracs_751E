#!/bin/sh
url='http://localhost:3000/items'

#status_code=$(curl --http1.1 --write-out %{http_code} --silent --output /dev/null http://localhost:3000/items)
json=$(curl --http1.1 -X POST --write-out %{json} --silent --output /dev/null $url --json '{ "name": "new Item!" }'| jq)
status_code=$(echo $json | jq ".http_code")

echo $status_code

if [[ $status_code -ne 201 ]]; then
	echo "Status Code invalid to $status_code rather 201"
	exit 1
else
	echo $json
	echo "PASS GET /items"
	exit 0 
fi
