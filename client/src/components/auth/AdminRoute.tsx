import React from 'react';
import { Route, Redirect, RouteProps  } from 'react-router-dom';
import { isLogin, isAdmin } from '../../utils/auth';

export interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
  }
const AdminRoute:React.FC<ProtectedRouteProps> = ({component:Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in and have admin role 
        // Otherwise, redirect the user to login page
        <Route {...rest} render={props => (
            isLogin() && isAdmin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default AdminRoute;