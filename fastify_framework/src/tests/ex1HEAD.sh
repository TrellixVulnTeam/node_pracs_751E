#!/bin/sh

url='http://localhost:3000/items'
# use curl to request headers (return sensitive default on timeout: "timeout 500"). Parse the result into an array (avoid settings IFS, instead use read)
read -ra result <<< $(curl --http1.1 -Is --connect-timeout 5 $url || echo "timeout 500")
# status code is second element of array "result"
status=${result[1]}
# if status code is greater than or equal to 400, then output a bounce message (replace this with any bounce script you like)

if [[ $status -ge 400  ]]; then
	echo "bounce at $url with status $status"
	echo "Status Code invalid to $status rather 200"
	exit 1
else
	echo "PASS GET /items"
	exit 0 
fi
