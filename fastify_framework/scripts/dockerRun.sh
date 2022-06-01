#!/bin/bash
echo "image to Run"
docker run -p 8080:3000 -d $1
