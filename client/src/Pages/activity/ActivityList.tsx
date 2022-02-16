
import React, { useState, useEffect } from 'react';
import ActivityListing from '../../components/activityManagement/ActivityListing';

import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
export const ActivityList = () => {
    const classes = useStyles1();

    return (
        <>
            <div className={classes.root}>
                <main className='width overfllowAuto pr-20 bodyMrTop manage-user-page'>
                    <div className="text-left">
                        <h3>Activity List</h3>
                    </div>
                    <ActivityListing />
                </main>
            </div>
        </>
    )
}
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    linkButton: {
        textDecoration: 'none',
    }
}));

