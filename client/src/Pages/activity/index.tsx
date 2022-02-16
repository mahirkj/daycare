import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { AddActivity } from './AddActivity'
import { ActivityList } from './ActivityList'
import PrimaryAppBar from '../../components/AppBar';
import { Grid } from '@material-ui/core';
import { SideBar } from '../../components/SideBar';
import PrivateRoute from '../../components/auth/PrivateRoute';

export const ActivityPage = () => {
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
                            <PrivateRoute path={path} component={ActivityList} exact></PrivateRoute>
                            <PrivateRoute path={`${path}/add/`} component={AddActivity} />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}


