## Installation

```bash
$ npm install
```

##DB Sheme

<p align=center>
<a href="https://ibb.co/Bc9BLXR"><img src="https://i.ibb.co/XjqtXhT/2021-01-04-194343.png" alt="2021-01-04-194343" border="0"></a>
</p>

## Migrations

Run npm build to create dist folder!
App use compiled migrations.

```bash
$ npm build
$ npm run typeorm migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
