# Simple API Starter
This is not a real project, i use this just for learning how to create basic rest api

## This project use :

- docker
- expressjs
- sequelize
- postgresql

## Instalation :
1. Clone this repo
2. Run `docker-compose up --build`
3. Access on http://localhost:3000

## Command
- create database `docker-compose exec api npx sequelize db:create`
- run migrate ` docker-compose exec api npx sequelize db:migrate`
- run rollback to migration `docker-compose exec api npx sequelize db:migrate:undo`
- create model and migration `docker-compose exec api npx sequelize model:generate --name <ModelName> --attributes <Attr1>:<Type>,<Attr2>:<Type>`

find more command on sequelize-cli repo https://github.com/sequelize/cli

## Done Process
### Users