import React, { useState, useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Dashboard from '../assets/icon/Dashboard.png';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Bus from '../assets/icon/Fleet.png';
import Payment from '../assets/icon/SideBarPayment.png';
import Calander from '../assets/icon/SideCalander.png';
import Help from '../assets/icon/Help.png';
import { isLogin, isAdmin, isTeacher, isParent } from '.././utils/auth';
import { NavLink, useHistory } from "react-router-dom";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { useTranslation } from "react-i18next";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse, ListSubheader } from '@material-ui/core';
import { useLocation } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 0,
      backgroundColor: '#373D49'
      , height: '100%'

    },
  },
  textcolor: {
    color: "#ffffff"

  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      backgroundColor: '#FFFFFF'

    },

  },
  avatar: {
    // marginLeft: '75%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#373D49'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export const SideBar = (props: any) => {

  const [name, setName] = useState('');
  const [selectedUser, setselectedUser] = useState(null);
  // let name: string | null | object = null
  const user_info = localStorage.getItem("user_info");

  useEffect(() => {
    if (user_info) {
      if (JSON.parse(user_info).name) {
        setName(JSON.parse(user_info).name)
      }
      if (JSON.parse(user_info).selected_user) {
        setselectedUser(JSON.parse(user_info).selected_user)
      }
    }

  }, [user_info])

  const { window } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const [tOpen, setTOpen] = React.useState('');

  const handleClick = (id: any) => {
    setOpen(!open);

    if (tOpen === id) {
      setTOpen("")
    } else {
      setTOpen(id);
    }
  };


  const drawer = (
    <div>

      {(isLogin() && isAdmin() ?
        <List>
          <ListItem button component={NavLink} exact activeClassName="highlighted" to="/dashboard">
            <ListItemIcon>
              <ListItemIcon className={classes.textcolor}> <i className="fas fa-chart-pie dashboardIcon"></i></ListItemIcon>
            </ListItemIcon>
            <ListItemText className={classes.textcolor} primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleClick('users')}>
            <ListItemIcon>
              <ListItemIcon className={classes.textcolor}> <i className="fas fa-users dashboardIcon"></i></ListItemIcon>
            </ListItemIcon>
            <ListItemText className={classes.textcolor} primary="Users" />
            {tOpen === 'users' ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={tOpen === 'users' ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/users/add">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-user-plus dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={t("Add users")} />
              </ListItem>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/users">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={t("Users")} />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleClick('childrens')}>
            <ListItemIcon>
              <ListItemIcon className={classes.textcolor}> <i className="fas fa-child dashboardIcon"></i></ListItemIcon>
            </ListItemIcon>
            <ListItemText className={classes.textcolor} primary="Children" />
            {tOpen === 'childrens' ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={tOpen === 'childrens' ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/childrens/add">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-user-plus dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={'Register Children'} />
              </ListItem>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/childrens/">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={'Children List'} />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleClick('payments')}>
            <ListItemIcon>
              <ListItemIcon className={classes.textcolor}> <i className="far fa-credit-card dashboardIcon"></i></ListItemIcon>
            </ListItemIcon>
            <ListItemText className={classes.textcolor} primary="Payment" />
            {tOpen === 'payments' ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={tOpen === 'payments' ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/payments/generate">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-cart-plus dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={'Generate Payments'} />
              </ListItem>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/payments">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={'Payments'} />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleClick('dailyReport')}>
            <ListItemIcon>
              <ListItemIcon className={classes.textcolor}> <i className="fas fa-tasks dashboardIcon"></i></ListItemIcon>
            </ListItemIcon>
            <ListItemText className={classes.textcolor} primary="Daily Report" />
            {tOpen === 'dailyReport' ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={tOpen === 'dailyReport' ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/reports">
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                <ListItemText className={classes.textcolor} primary={'Daily Report List'} />
              </ListItem>
            </List>
          </Collapse>
        </List>
        : isLogin() && isTeacher() ?
          <List>
            <ListItem button onClick={() => handleClick('childrens')}>
              <ListItemIcon>
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-child dashboardIcon"></i></ListItemIcon>
              </ListItemIcon>
              <ListItemText className={classes.textcolor} primary="Children" />
              {tOpen === 'childrens' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={tOpen === 'childrens' ? true : false} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/assignedUser">
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                  <ListItemText className={classes.textcolor} primary={t("Children List")} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => handleClick('attendance')}>
              <ListItemIcon>
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-check-square dashboardIcon"></i></ListItemIcon>
              </ListItemIcon>
              <ListItemText className={classes.textcolor} primary="Attendance" />
              {tOpen === 'attendance' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={tOpen === 'attendance' ? true : false} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/attendance/add">
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-user-check dashboardIcon"></i></ListItemIcon>
                  <ListItemText className={classes.textcolor} primary={'Add Attendance'} />
                </ListItem>
                <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/attendance/">
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                  <ListItemText className={classes.textcolor} primary={'Attendance List'} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => handleClick('activity')}>
              <ListItemIcon>
                <ListItemIcon className={classes.textcolor}> <i className="fas fa-chart-line dashboardIcon"></i></ListItemIcon>
              </ListItemIcon>
              <ListItemText className={classes.textcolor} primary="Activity" />
              {tOpen === 'activity' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={tOpen === 'activity' ? true : false} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/activity/add">
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-plus-circle dashboardIcon"></i></ListItemIcon>
                  <ListItemText className={classes.textcolor} primary={'Add Activity'} />
                </ListItem>
                <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/activity">
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                  <ListItemText className={classes.textcolor} primary={'Activity List'} />
                </ListItem>
              </List>
            </Collapse>
          </List>
          :
          isLogin() && isParent() ?
            <List>
              <ListItem button onClick={() => handleClick('childrens')}>
                <ListItemIcon>
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-child dashboardIcon"></i></ListItemIcon>
                </ListItemIcon>
                <ListItemText className={classes.textcolor} primary="Children" />
                {tOpen === 'childrens' ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={tOpen === 'childrens' ? true : false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/assignedUser">
                    <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                    <ListItemText className={classes.textcolor} primary={t("Children List")} />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleClick('payment')}>
                <ListItemIcon>
                  <ListItemIcon className={classes.textcolor}> <i className="far fa-credit-card dashboardIcon"></i></ListItemIcon>
                </ListItemIcon>
                <ListItemText className={classes.textcolor} primary="Payment" />
                {tOpen === 'payment' ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={tOpen === 'payment' ? true : false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/paying">
                    <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                    <ListItemText className={classes.textcolor} primary={'Payment List'} />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleClick('dailyReport')}>
                <ListItemIcon>
                  <ListItemIcon className={classes.textcolor}> <i className="fas fa-tasks dashboardIcon"></i></ListItemIcon>
                </ListItemIcon>
                <ListItemText className={classes.textcolor} primary="Daily Report" />
                {tOpen === 'dailyReport' ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={tOpen === 'dailyReport' ? true : false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={NavLink} exact className={classes.nested} activeClassName="highlighted" to="/reports">
                    <ListItemIcon className={classes.textcolor}> <i className="fas fa-list dashboardIcon"></i></ListItemIcon>
                    <ListItemText className={classes.textcolor} primary={'Daily Report List'} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
            : null
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <nav className={`leftSideBar ${classes.drawer}`} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {drawer}

      </nav>
    </>
  );
}

