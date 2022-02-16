import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { Main } from './Main'
import { Grid } from '@material-ui/core';

export const SigninPage = () => {
    let { path } = useRouteMatch();

    return (
        <div >
            <Fragment>
                <Grid container >
                    <Switch>
                        <Route path={path} component={Main} exact />
                    </Switch>
                </Grid>
            </Fragment>
        </div >

    )
}