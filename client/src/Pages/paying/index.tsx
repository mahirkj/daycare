import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { PaymentList } from './PaymentList'
import PrimaryAppBar from '../../components/AppBar';
import { Grid } from '@material-ui/core';
import { SideBar } from '../../components/SideBar';
import PrivateRoute from '../../components/auth/PrivateRoute';
import AdminRoute from '../../components/auth/AdminRoute';

export const PayingPage = () => {
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
                            <PrivateRoute path={path} component={PaymentList} exact></PrivateRoute>
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}


