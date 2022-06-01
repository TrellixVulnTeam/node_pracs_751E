#!/bin/sh
url='http://localhost:3000/items/1'

status_code=$(curl --http1.1 --write-out %{http_code} --silent --output /dev/null $url)

if [[ $status_code -ne 200 ]]; then
	echo "Status Code invalid to $status_code rather 200"
	exit 1
else
#	echo $json
	echo "PASS GET /items"
	exit 0 
fi
