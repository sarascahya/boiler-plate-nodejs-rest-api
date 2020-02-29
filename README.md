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
Please add 
`docker-compose exec api npx sequelize` before every command
example:
`docker-compose exec api npx sequelize db:create`


- create database `db:create`
- run migrate `db:migrate`
- run rollback to migration `db:migrate:undo`
- create model and migration 
`model:generate --name <ModelName> --attributes <Attr1>:<Type>,<Attr2>:<Type>`
example:
`model:generate --name Event --attributes title:string,description:string`

find more command on sequelize-cli repo https://github.com/sequelize/cli