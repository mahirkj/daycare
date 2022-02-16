import { Grid } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import PrimaryAppBar from '../../components/AppBar';
import { SideBar } from '../../components/SideBar';
import { Dashboard } from './Dashboard';
import AdminRoute from '../../components/auth/AdminRoute';
export const DashboardPage = () => {
    let { path } = useRouteMatch();
    return (
        <div>
            <PrimaryAppBar />
            <Grid container >
                <Grid xs={2}>
                    <SideBar />
                </Grid>
                <Grid xs={10}>
                    <Fragment>
                        <Switch>
                            <AdminRoute path={path} component={Dashboard} exact />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}