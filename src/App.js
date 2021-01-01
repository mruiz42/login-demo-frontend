import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import {Cookies} from 'react-cookies';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './Register';
import Logout from './Logout';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import {isLogin, removeUserSession, setUserSession, verifySession} from './Utils/Common';
require('dotenv').config();

const SERVER = process.env.REACT_APP_API_URL;


function App() {
    const [authLoading, setAuthLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        setAuthLoading(true);
        const loginState = isLogin();
        if (!loginState) {
            return;
        }
        verifySession()
            .then(re => {
                console.log(re)
                setUserSession(re.data)             // This triggers the error below, not sure if this is ok (spoof sid)
                setAuthLoading(false)
                setIsAuth(true)
            })
            .catch(e => {
                console.log(e)
                removeUserSession()
                setAuthLoading(false)
                setIsAuth(false)
            })
        }, []);

    if (authLoading && isLogin()) {
        return <div className="content">Checking Authentication...</div>
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <div className="header">
                        <NavLink exact activeClassName="active" to="/">Home</NavLink>
                        <NavLink restrict={false} to="/register">Register</NavLink><small>(Access without token only)</small>
                        <NavLink restrict={false} to="/login">Login</NavLink><small>(Access without token only)</small>
                        <NavLink restrict={true} to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
                        <NavLink restrict={true} to="/logout">Logout</NavLink><small>(Access with token only)</small>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PublicRoute path="/login" component={Login} restrict={false} auth={isAuth} />
                            <PublicRoute path="/register" component={Register} restrict={false} auth={isAuth} />
                            <PrivateRoute path="/dashboard" component={Dashboard} auth={isAuth} />
                            <PrivateRoute path="/logout" component={Logout} auth={isAuth} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
