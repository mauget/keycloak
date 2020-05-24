# Keycloak React Demo

A Docker-based Keycloak demo service provides authentications for this React demo. 

+ The demo access token has a five-minute lifetime. 
+ The refresh token lives for 30 minutes.
+ A React demo session updates its tokens evey 29 minutes.

Try it:

+ Run the demo Keycloak server from its _dockerhub_ image: `docker run -p 8080:8080 mauget/keycloak` 
+ Update node_modules from this project's root: `yarn install`
+ Access the React app: http://localhost:3000 
+ Login as `joe` / `password`
+ Check the Keycloak admin console at http://localhost:8080 - `admin` / `password` 

Details ...

## Keycloak Demo Image

The _dockerhub_ demo Keycloak image can base a container having an
admin user and two client users.

### Create a  Container:

`docker run -p 8080:8080 mauget/keycloak`

### Supplied Admin User
+ Admin user `admin`
+ admin password `password`

### Supplied Client Users
+ `joe` / `password`
+ `mauget` / `password`

### Administration

Log in as user `admin` to [http://localhost:8080](http://localhost:8080) 

The image defines a realm and clientId:

+ realm `keycloak-demo`
+ clientId `react-client`

Check the following settings
1. A `react-client` in the  `keycloak-demo` realm' `Clients` panel. 
2. Click on `react-client`.
3. Verify **Valid Redirect URIs** set to  `*`
4. Verify **Web Origins** set to `*`  (shuould be specific for production - this is a demo)
5. Click on **Users** in the sidebar; look at the users


---------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
