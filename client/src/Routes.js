import React from 'react'
import {Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Chat from './components/Chat';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignUp} />
            <Route path="/chat" exact component={Chat} />
        </Switch>
    )
}

export default Routes
