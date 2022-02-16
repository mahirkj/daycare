
import React, { useState, useEffect } from 'react';
import PaymentListing from '../../components/paymentManagement/PaymentListing';

import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
export const PaymentList = () => {
    const classes = useStyles1();

    return (
        <>
            <div className={classes.root}>

                <main className='width overfllowAuto pr-20 bodyMrTop manage-user-page'>
                    <div className="text-left">
                        <h3>Payments List</h3>
                    </div>
                    <PaymentListing />
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

