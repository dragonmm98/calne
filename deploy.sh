#!/bin/bash

#PRODUCTION 
git reset --hard
git pull origin master
npm i yarn -g 
yarn
yarn run build 

pm2 start "yarn run start:prod" --name=Calne-React

