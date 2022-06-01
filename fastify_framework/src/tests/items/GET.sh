#!/bin/sh
url='http://localhost:3000/items'

#status_code=$(curl --http1.1 --write-out %{http_code} --silent --output /dev/null http://localhost:3000/items)
json=$(curl --http1.1 --write-out %{json} --silent --output /dev/null http://localhost:3000/items | jq)
status_code=$(echo $json | jq ".http_code")

echo $status_code

if [[ $status_code -ne 200 ]]; then
	echo "Status Code invalid to $status_code rather 200"
	exit 1
else
	echo $json
	echo "PASS GET /items"
	exit 0 
fi
