# 2023_Fall_CloudNative_Group11

2023 Fall NTU CSIE course Cloud Native Application Development.

We are group 11, working on the project "I'm Uber" for solving the problem: Carpooling Issues of TSMC employees.

## Getting Started

## Frontend

### Installation

You should install [Node](https://nodejs.org/en) from the website first, then run this to install React.js.

```
npm i create-react-app
```

Installation for packages

```
cd frontend
npm install
```

Run

```
npm start // under frontend folder
```

Then you'll see the website in [http://localhost:3000](http://localhost:3000). If not, just open the link.

## Backend

### Requirement

node v20.9.0
yarn v1.22.21

```bash=
sudo npm install -g yarn@1.22.21
```

### Install Dependencies

```bash=
cd backend
yarn install
```

### Run test

```bash=
yarn run test
```

### Run

Create the server on the port 4000

```bash=
yarn server
```

Use curl command to test our server.
Ex:

```bash=
curl http://127.0.0.1:4000
```

You will get "hello world" from the server.

### set .env

You can define your own environment variables in backend/.env (Note that .env should not be pushed to the remote github)
