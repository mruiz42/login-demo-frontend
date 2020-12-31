import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './Common';

const PublicRoute = ({component: Component, restrict, ...rest}) => {
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
          isLogin() ?
              <Redirect to="/dashboard" /> : <Component {...props} />
      )} />
  );
};

export default PublicRoute;