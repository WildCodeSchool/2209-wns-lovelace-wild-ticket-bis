#!/bin/sh
git pull origin dev && git clean -f -d
./build-start.prod.sh