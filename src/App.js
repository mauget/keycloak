import React from 'react';
import './App.css';

function SignOut(props) {
    const {label, logoutUrl} = {...props};
    const onClick = () => {
        window.location.assign(logoutUrl);
    }
    return <button onClick={onClick}>{label}</button>;
}

function App(props) {
    const { userProfile, logoutUrl, keycloak } = {...props};
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h3>Authenticated User</h3>
                    <div>
                        <div>{userProfile.firstName} {userProfile.lastName} {userProfile.userName}</div>
                        <div>ID: {userProfile.username}</div>
                        <p>Email: {userProfile.email}</p>
                    </div>
                    <div><SignOut label={'Sign out'} logoutUrl={logoutUrl}/></div>
                </header>
            </div>
            <hr/>
            <div className={"info"}>
                <div>Parsed access token and refresh token:</div>
                <ul>
                    <li>{JSON.stringify(keycloak.tokenParsed, null, '  ')}</li>
                    <li>{JSON.stringify(keycloak.refreshTokenParsed, null, '  ')}</li>
                </ul>
            </div>
        </>
    );
}

export default App;
