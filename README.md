# Nptt-Server-MongoDB

`Nptt-Server-MongoDB` is REST API server implementation built on top `Node.js` and `Express.js` with `Mongoose.js` for `MongoDB` integration. Access control follows `OAuth 2.0` spec with the help of `OAuth2orize` and `Passport.js`.


## Running project

## Manual

You need to have [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com) installed.

### Run server

```sh
npm start
# alias for
node bin/www
```

### Create demo data

```sh
npm run-script generate
# alias for
node generateData.js
```

## Make Requests

Create and refresh access tokens:

```sh
http POST http://localhost:1337/api/oauth/token grant_type=password client_id=android client_secret=SomeRandomCharsAndNumbers username=myapi password=abc1234
http POST http://localhost:1337/api/oauth/token grant_type=refresh_token client_id=android client_secret=SomeRandomCharsAndNumbers refresh_token=[REFRESH_TOKEN]
```

Create your article data:

```sh
http POST http://localhost:1337/api/articles title='New Article' author='John Doe' description='Lorem ipsum dolar sit amet' images:='[{"kind":"thumbnail", "url":"http://habrahabr.ru/images/write-topic.png"}, {"kind":"detail", "url":"http://habrahabr.ru/images/write-topic.png"}]' Authorization:'Bearer ACCESS_TOKEN'
```

Update your article data:

```sh
http PUT http://localhost:1337/api/articles/EXISTING_ARTICLE_ID title='Updated Article' author='Jane Doe' description='This is now updated' Authorization:'Bearer ACCESS_TOKEN'
```

Get your data:

```sh
http http://localhost:1337/api/users/info Authorization:'Bearer ACCESS_TOKEN'
http http://localhost:1337/api/articles Authorization:'Bearer ACCESS_TOKEN'
```

## Tests

```sh
npm test
# alias for
node ./test/server.test.js
```

## Modules used

Some of non-standard modules used:

* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nconf](https://www.npmjs.com/package/nconf)
* [winston](https://www.npmjs.com/package/winston)
* [faker](https://www.npmjs.com/package/faker)
* [oauth2orize](https://www.npmjs.com/package/oauth2orize)
* [passport](https://www.npmjs.com/package/passport)

Test modules:

* [tape](https://www.npmjs.com/package/tape)
* [superagent](https://www.npmjs.com/package/superagent)

## Tools used

* [httpie](https://github.com/jkbr/httpie) - command line HTTP client

### JSHint

```sh
npm install jshint -g
jshint libs/**/*.js generateData.js
```

## Author

Created and maintained by Developer NKA ([@developernka]).

## License

`Nptt-Server-MongoDB` is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
