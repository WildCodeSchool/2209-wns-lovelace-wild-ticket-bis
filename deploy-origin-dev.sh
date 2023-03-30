#!/bin/sh
git fetch origin && git reset --hard origin/dev && git clean -f -d
./build-start.prod.sh