import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import UserContextProvider from './contexts/UserContext';

function App() {
    return (
        <UserContextProvider>
            <Router>
                <div className="app">
                    <Routes/>
                </div>
            </Router>
        </UserContextProvider>
    );
}

export default App;
