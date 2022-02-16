import { Grid } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Image from '../assets/signin.png'; // Import using relative path
import logo from '../assets/logoText.png'; // Import using relative path
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
export const Home = () => {
    const classes = useStyles();
    return (
        <>
            <div className="showcase">
                <div className="content">
                    <img src={logo} className="logo" alt="Traversy Media" />
                    <div className="title">
                        Welcome To Horizon Daycare
                    </div>
                    <div className="text">
                        The Best And Modern Childcare Facility In The UK
                    </div>
                </div>
            </div>

            <section className="services">
                <div className="container grid-3 center">
                    <div>
                        <i className="fas fa-chart-line fa-3x"></i>
                        <h3>Parent Portal</h3>
                        <p>A parent can see payments records, child daily activity reports and make online payments!</p>
                    </div>
                    <div>
                        <i className="fas fa-chalkboard-teacher fa-3x"></i>
                        <h3>Trained Staff</h3>
                        <p>The best and most trained staff for childcare!</p>
                    </div>
                    <div>
                        <i className="fas fa-desktop fa-3x"></i>
                        <h3>Activity Monitoring</h3>
                        <p>A parent can Monitor Children Daily report!</p>
                    </div>
                </div>
            </section>

            <section className="about bg-light">
                <div className="container">
                    <div className="grid-2">
                        <div className="center">
                            <i className="fas fa-laptop-code fa-10x"></i>
                        </div>
                        <div>
                            <h3>About Us</h3>
                            <p>Welcome to Horizon Daycare! We offer children care programs in which children grow, learn and discover with their peers. At horizon daycare, your child will be cared for by encouraging adults in a creative, safe and supportive learning environment. As a family- and locally-owned organization, we are committed to strong relationships with children, families and teaching staff. We would love for you to visit us to see if Especially for Children is the right place for you and you child.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="center bg-dark">
                <p>Horizon Daycare &copy; 2022</p>
            </footer>

        </>

    )
}