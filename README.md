# Chat
A chat application using NestJS

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project creation

To create the project, I used NestJS to create the backend. To use the CLI, 
first you need to install it:

```bash
$ npm i -g @nestjs/cli
```

Then, to create the project, run:

```bash
$ nest new --directory . chat
```

Let's run the application to see if everything is working:

```bash
$ bon ryb start
```

Then, do a request to `http://localhost:3000` and you should see the message `Hello World!`:

```bash
$ curl http://localhost:3000
```

Let's leave this hello module for now, we'll use it later for the health check.

### Create a users module

Now, let's create a module for users. We'll use it to create and list users.

```bash
$ nest generate module users
```
