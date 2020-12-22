import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './Register';
import Logout from './Logout';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { isLogin, removeUserSession } from './Utils/Common';
require('dotenv').config();

const SERVER = process.env.REACT_APP_API_URL;

function App() {
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        if (document.cookie) {
            axios.post(SERVER + '/verify', {withCredentials: true, headers {Authorization: `Bearer ${}`}})
                .then(response => {
                    setAuthLoading(false);
                })
                .catch(error => {
                    removeUserSession();
                    setAuthLoading(false);
                });
        }
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
                        <NavLink restricted={false} to="/register">Register</NavLink><small>(Access without token only)</small>
                        <NavLink restricted={false} to="/login">Login</NavLink><small>(Access without token only)</small>
                        <NavLink restricted={true} to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
                        <NavLink restricted={true} to="/logout">Logout</NavLink><small>(Access with token only)</small>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PublicRoute path="/login" component={Login} />
                            <PublicRoute path="/register" component={Register} />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <PrivateRoute path="/logout" component={Logout} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
