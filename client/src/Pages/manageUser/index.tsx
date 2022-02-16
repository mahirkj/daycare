import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import AdminRoute from '../../components/auth/AdminRoute';
import PrimaryAppBar from '../../components/AppBar';
import { SideBar } from '../../components/SideBar';
import { ManageUser } from './ManageUser'
import { AddUser } from './AddUser'
import { UserDetail } from './UserDetail'
import PrivateRoute from '../../components/auth/PrivateRoute';


export const ManageUserPage = () => {
    let { path } = useRouteMatch();

    return (
        <div >
            <PrimaryAppBar />
            <Grid container >
                <Grid xs={2}>
                    <SideBar />
                </Grid>
                <Grid xs={10}>
                    <Fragment>
                        <Switch>
                            <AdminRoute path={path} component={ManageUser} exact />
                            <AdminRoute path={`${path}/add/`} component={AddUser} />
                            <AdminRoute path={`${path}/detail/:role/:id`} component={UserDetail} />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}