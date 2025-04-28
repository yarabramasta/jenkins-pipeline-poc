#!/bin/sh
cd ./web
# Install dependencies
npm run ci
# Build the project
npm run build