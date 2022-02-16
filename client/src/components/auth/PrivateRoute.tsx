import React from 'react';
import { Route, Redirect, RouteProps  } from 'react-router-dom';
import { isLogin } from '../../utils/auth';

export interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
  }
const PrivateRoute:React.FC<ProtectedRouteProps> = ({component:Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to login page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;