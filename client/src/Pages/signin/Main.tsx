import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/signin.png'; // Import using relative path
import logo from '../../assets/logoText.png';
import { Link } from 'react-router-dom';
import { useCreateLogin } from '../../resources/useCreateLogin'
import { Redirect } from "react-router-dom";
import { isLogin, isAdmin, isTeacher, isParent } from '../../utils/auth';
import MainAppBar from '../../components/MainAppBar';

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

export const Main = () => {
  const classes = useStyles();
  const mutation = useCreateLogin()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <MainAppBar mutation={mutation}/>
  );
}