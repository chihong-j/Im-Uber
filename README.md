# 2023_Fall_CloudNative_Group11
2023 Fall NTU CSIE course Cloud Native Application Development. 

We are group 11, working on the project "I'm Uber" for solving the problem: Carpooling Issues of TSMC employees.

## Note from chihung (11/07)
Since we have nothing currently, I just directly push the initial code to the main branch.
I think we should add dev branch for deveplopment. And every time we try to write code, we should do the following things. For example, if I am going to develop the sign in job, I should create the `feature/{your_branch_name}` from `dev`
```
git checkout -b feature/sign_in dev
```
After finishing the sign in job, I can just push it to the `feature/signIn` branch. Then I can start a pull request(for others to review code?), and merge the feature branch into dev branch.

Just let us know if you have any ideas. I haven't read the 12 factors yet. Not sure if we need to do other things like create test-feature branch for testing?

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
Create the server on the port 4000
```bash=
cd backend
yarn server
```

Use curl command to test our server.
Ex:
```bash=
curl http://127.0.0.1:4000
```
You will get "hello world" from the server.
