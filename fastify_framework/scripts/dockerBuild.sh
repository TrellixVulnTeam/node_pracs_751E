#!/bin/bash
echo "Name for image"
docker build . -t $1
