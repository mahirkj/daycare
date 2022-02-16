
import React, { useState, useEffect } from 'react';
import AddNewActivity from '../../components/activityManagement/AddNewActivity';

import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
export const AddActivity = () => {
    const classes = useStyles1();

    return (
        <>
            <div className={classes.root}>

                <main className='width overfllowAuto pr-20 bodyMrTop manage-user-page'>
                    <div className="text-left">
                        <h3>Add Activity</h3>
                    </div>
                    <AddNewActivity />
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

