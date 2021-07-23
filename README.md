# Sing Me A Song API

Sing Me A Song is a web api for music recommendation. This is a public API and it is currently deployed to heroku.

## Live Demo
[link](https://sing-me-a-song-vel.herokuapp.com/)

## Routes 
- https://sing-me-a-song-vel.herokuapp.com/
- GET /recommendations/random
- GET /recommendations/top/$AMOUNT
- GET /recommendations/genres/$ID/random
- GET /genres
- GET /genres/$ID/

- POST /recommendations </br>
expects: {"name":"$NAME", "youtubeLink":"$LINK"} </br>

- POST /recommendations/$ID/upvote </br>
expects nothing </br>

- POST /recommendations/$ID/downvote </br>
expects nothing </br>

- POST /genres </br>
expects: {"name":"$NAME"} </br>


## Visual Database Structure
[link](https://imgur.com/a/B12bt83)

## Built With

- NodeJS , ExpressJS , TypeScript , PostgreSQL
- Linux

## Tested With

- Jest, Supertest

## Instalation
- Install NodeJS, nvm and git
- $ git clone https://github.com/vitorelourenco/sing-me-a-song.git
- $ npm i
- Create your psql dev database, there's a dump at /dump_database_example.sql (there's no sensitive information there)
- Create your psql test database
- Create your .env and .env.test files (there are examples at /.env.example /.env.test.example)

## Test
- $ npm run test 

## Run Dev Environment
- $ npm run dev

## Build
- $ npm run build

## Dependencies
- All dependencies are listed in the package.json file.

## Deploy
- You can deploy this project on heroku like I did. There are plenty of tutorials online and it's free.

## Author

👤 **Vitor Emanuel Lourenco**

- GitHub: [@vitorelourenco](https://github.com/vitorelourenco)
- Twitter: [@Vitorel](https://twitter.com/Vitorel)
- LinkedIn: [vitoremanuellourenco](https://www.linkedin.com/in/vitoremanuellourenco/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/vitorelourenco/sing-me-a-song/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- RespondeAi (https://www.respondeai.com.br/)
