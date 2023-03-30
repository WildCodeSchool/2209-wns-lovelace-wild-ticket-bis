#!/bin/sh
git fetch origin && git reset --hard origin/dev && git clean -f -d
chmod +x build-start.prod.sh
chmod +x follow-logs.prod.sh
./build-start.prod.sh