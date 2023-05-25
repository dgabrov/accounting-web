#!/bin/sh
export NODE_OPTIONS=--openssl-legacy-provider
cd account
echo before npm install
npm install
echo npm install proceeded successfully
echo will run build
npm run build
echo run build successfully done
node -v
npm -v
