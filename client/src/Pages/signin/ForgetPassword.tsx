import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/signin.png'; // Import using relative path
import logo from '../../assets/Swvl-Logo.png';
import { Link } from 'react-router-dom';
import { useCreateLogin } from '../../resources/useCreateLogin'
import { Redirect } from "react-router-dom";
import { isLogin, isAdmin } from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export const ForgetPassword = () => {
    const classes = useStyles();
    const mutation = useCreateLogin()
    const [email, setEmail] = useState('');

    return (
        <Grid container component="main" className={`${classes.root} loginPage `}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <Grid lg={5}>
                    <div className={` login-acc-div ${classes.paper}`}>
                        <div className="title1">
                            Reset New Password
                        </div>
                        <p className="wellcome">
                            Please Enter Your Email
                        </p>
                        <form className={classes.form} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email"
                                name="Email"
                                autoComplete="Email"
                                autoFocus
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <strong><Link to={`/`}>Cancel</Link></strong>

                            <div>
                                {mutation.isLoading ? (
                                    'waiting...'
                                ) : (
                                    <>
                                        {mutation.isError ? (
                                            <div>An error occurred: {mutation.error}</div>
                                        ) : null}

                                        {mutation.isSuccess && mutation.data?.data.status === 1 ? <div>Reset url is send to your mail</div> : <div>{mutation.data?.data.message}</div>}
                                        <div className="signinbutton custom-btn">
                                            <Link to='/forget_password' onClick={() => {
                                                mutation.mutate({ email: email.toLowerCase() })
                                            }}><p className="signinbuttontext">Send</p></Link>
                                        </div>
                                    </>
                                )}
                            </div>

                        </form>
                    </div>
                </Grid>

            </Grid>
        </Grid>
    );
}