#!/bin/bash

#PRODUCTION 
git checkout master
git reset --hard
git pull origin master

npm i yarn -g 
yarn global add serve
yarn
yarn run build 
pm2 start serve-s build --name=Calne-react

