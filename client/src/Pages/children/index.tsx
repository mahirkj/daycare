import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { AddChildren } from './AddChildren'
import { ChildrenDetail } from './ChildrenDetail'
import { ChildrenList } from './ChildrenList'
import PrimaryAppBar from '../../components/AppBar';
import { Grid } from '@material-ui/core';
import { SideBar } from '../../components/SideBar';
import PrivateRoute from '../../components/auth/PrivateRoute';

export const ChildrenPage = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <PrimaryAppBar />
            <Grid container >
                <Grid xs={2}>
                    <SideBar/>
                </Grid>
                <Grid xs={10}>
                    <Fragment>
                        <Switch>
                            <PrivateRoute path={path} component={ChildrenList} exact></PrivateRoute>
                            <PrivateRoute path={`${path}/add/`} component={AddChildren} />
                            <PrivateRoute path={`${path}/detail/:id`} component={ChildrenDetail} />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}


