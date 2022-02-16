import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Image from '../assets/logoText.png';
import flagEng from '../assets/flags/united-states-of-america-flag-icon-32.png'
import flagArabic from '../assets/flags/saudi-arabia-flag-icon-32.png'
import { logout } from '../utils/auth';
import { useHistory } from 'react-router';
import { useTranslation, Trans } from "react-i18next";
import i18next from 'i18next';
import { Box, ListItem, ListItemIcon, ListItemText, Tab, Tabs, useTheme, createTheme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';
import { Signin } from './Signin'
import { Home } from './Home'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectContainer: {
      float: 'right',
      display: 'flex',
      width: '50%'
    },
    selectItem: {
      marginLeft: '1rem',
      marginRight: '1rem',
      width: '33%'
    },
    tab: {
      '& .MuiBox-root': {
        padding: '0px',
      },
    },
    grow: {
      flexGrow: 1,
      zIndex: 111111
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    appBarTitle: {
      fontWeight: 700,
      marginLeft: '1rem'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    textcolor: {
      color: "#ffffff"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }),
);

export default function MainAppBar(prop: any) {
  const history = useHistory()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [model, setModel] = useState(false)
  const [value, setValue] = React.useState(0);
  const mutation = prop.mutation
  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  function a11yProps(index: any) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }
  const handleChange = (event: unknown, newValue: number) => {
    console.log('ll', newValue);

    setValue(newValue);
  };
  // const handleChangeIndex = (index: number) => {
  //   console.log('ali', index);

  //   setValue(index);
  // };
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <div >{children}</div>}
      </Typography>
    );
  }
  const { i18n } = useTranslation();

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        logout();
        history.push({ pathname: '/' })

      }} >Log out</MenuItem>
    </Menu>
  );



  return (
    <div className={classes.grow}>
      <AppBar position="static" color="default">
        <div className='mainBar'>
          <img style={{ width: '57px' }} src={Image} />
          {/* <Typography className={classes.appBarTitle}>
              Horizon Daycare
            </Typography> */}
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="About Us" {...a11yProps(0)} />
            <Tab label="Login" {...a11yProps(1)} />
          </Tabs>
        </div>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
      // onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Signin mutation={mutation} />
        </TabPanel>
      </SwipeableViews>

    </div>
  );
}
