
import React from 'react';
import ChildrenDetailList from '../../components/childrenManagement/ChildrenDetailList';

import { makeStyles } from '@material-ui/core';
export const ChildrenDetail = () => {
    const classes = useStyles1();
    return (
        <>
            <div className={classes.root}>

                <main className='width overfllowAuto pr-20 bodyMrTop manage-user-page'>
                    <ChildrenDetailList />
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

