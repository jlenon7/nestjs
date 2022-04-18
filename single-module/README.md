# NestJS NoSQL 😸

> NestJS single module template API for NoSQL applications

<img src=".gitlab/box.png" width="200px" align="right" hspace="30px" vspace="100px">

## 🚀 Running the project

Run a new `MongoDB` instance with Docker

```bash
docker run --name=mongodb-devel -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d mongo
```

Run a new `Redis` instance with Docker

```bash
docker run --name=redis-devel --publish=6379:6379 --hostname=redis --restart=on-failure --detach redis:latest
```

Now you can start running the project, install dependencies using npm

```bash
npm install
```

Generate the archive .env and change the connection of `Redis` and `MongoDB`

```bash
cp .env.example .env && cp .env.example .env.testing
```

To run E2E and Unit tests without logs

```bash
npm run test
```

To run E2E and Unit tests with debug logs

```bash
npm run test:debug
```

To run the application in development mode without debug logs

```bash
npm run start:dev
```

To run the application in development mode with debug logs

```bash
npm run start:debug:dev
```

---

## ☕ Project Documentation

See the project documentation accessing the main route **/**

---

Made with 🖤 by [jlenon7](https://github.com/jlenon7) 👨‍💻
