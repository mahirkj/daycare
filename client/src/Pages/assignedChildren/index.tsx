import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import PrivateRoute from '../../components/auth/PrivateRoute';
import PrimaryAppBar from '../../components/AppBar';
import { SideBar } from '../../components/SideBar';
import { ChildrenDetail } from './ChildrenDetail'
import { ChildrenList } from './ChildrenList'
import AdminRoute from '../../components/auth/AdminRoute';


export const AssignedChildrenPage = () => {
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
                            <PrivateRoute path={path} component={ChildrenList} exact />
                            <PrivateRoute path={`${path}/detail/:id`} component={ChildrenDetail} />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}