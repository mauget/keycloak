import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from "keycloak-js";

const authServer = 'http://localhost:8080';
const MS_PER_SEC = 1000;

async function renderApp(keycloak, keycloakInitOptions) {
    const {realm, clientId} = {...keycloakInitOptions};
    const userProfile = await keycloak.loadUserProfile();
    const logoutUrl = await keycloak.createLogoutUrl();

    localStorage.setItem("react-refresh-token", keycloak.refreshToken);
    ReactDOM.render(
        <React.StrictMode><App realm={realm} clientId={clientId}
                               userProfile={userProfile} logoutUrl={logoutUrl} keycloak={keycloak}
        /></React.StrictMode>,
        document.getElementById('root'));
}

function reloadIfUnauthorized(auth) {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }
}

function logTokenLifeCycle(keycloak, isRefreshed) {
    console.warn(`>> Token ${isRefreshed ? 'IS REFRESHED' : 'needs no refresh'} at ${new Date().toLocaleString()}`);
    console.warn(`   Access token expires at ${new Date(keycloak.tokenParsed.exp * MS_PER_SEC).toLocaleString()}`);
    console.warn(`   Refresh token expires at ${new Date(keycloak.refreshTokenParsed.exp * MS_PER_SEC).toLocaleString()}`);
}

function calculateRefreshMS(keycloak) {
    const intervalSeconds = keycloak.refreshTokenParsed.exp + keycloak.timeSkew - 120 - keycloak.refreshTokenParsed.iat;

    console.log(`Refresh interval ${intervalSeconds} seconds`);
    return intervalSeconds * MS_PER_SEC;
}

function timedTokenRefresh(keycloak) {
    console.log('keycloak', keycloak);
    logTokenLifeCycle(keycloak, false);

    setInterval((async () => {
        const isRefreshed = await keycloak.updateToken(70);
        logTokenLifeCycle(keycloak, isRefreshed);
    }), calculateRefreshMS(keycloak));
}

function init(auth, keycloak, keycloakInitOptions) {
    reloadIfUnauthorized(auth);
    renderApp(keycloak, keycloakInitOptions);
    timedTokenRefresh(keycloak);
}

async function launchSecureApp(keycloak, keycloakInitOptions) {
    const {onLoad, promise, checkLoginIframe} = {...keycloakInitOptions};
    try {
        const auth = await keycloak.init({onLoad, promise, checkLoginIframe});
        init(auth, keycloak, keycloakInitOptions);
    } catch (err) {
        console.error('Authentication failed', err);
    }
}

// Keycloak will intercept with sign-in. Will redirect to app if authorized..
(() => {
    const keycloakInitOptions = {
        url: `${authServer}/auth`,
        realm: 'keycloak-demo',
        clientId: 'react-client',

        checkLoginIframe: false, // ref: https://github.com/dasniko/keycloak-reactjs-demo/issues/3
        onLoad: 'login-required',
        promise: 'native',
    }
    const keycloak = Keycloak(keycloakInitOptions);
    launchSecureApp(keycloak, keycloakInitOptions);
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
