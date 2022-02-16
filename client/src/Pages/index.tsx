import React, { Fragment, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AdminRoute from '../components/auth/AdminRoute';
import PrivateRoute from '../components/auth/PrivateRoute';
import { SigninPage } from './signin/index'
import { ChildrenPage } from './children/index'
import { ActivityPage } from './activity/index'
import { AssignedChildrenPage } from './assignedChildren/index'
import { PaymentPage } from './payment/index'
import { AttendancePage } from './attendance/index'
import { ManageUserPage } from './manageUser/index'
import { useIsFetching } from 'react-query'
import { DashboardPage } from './dashboard/index'
import { PayingPage } from './paying/index'
import { ReportPage } from './dailyReport/index'
import { ForgetPassword } from './signin/ForgetPassword';
import '../../src/App.css';
// import { ForgetPassword } from './signin/ForgetPassword';
// import { ResetPassword } from './signin/ResetPassword';
// import { FirstTimeLogin } from './signin/FirstTimeLogin';
import { Redirect, useHistory } from 'react-router';

export const Index = () => {
    let history = useHistory();
    const reload = () => {
        // eslint-disable-next-line no-restricted-globals
        location?.reload()
    }
    console.log('query', useIsFetching());
    if (useIsFetching() !== 0) {
        if ((document as any).getElementById("cover-spin"))
            (document as any).getElementById("cover-spin").style.display = "block";
    } else {
        if ((document as any).getElementById("cover-spin"))
            (document as any).getElementById("cover-spin").style.display = "none";
    }
    return (
        <div >

            <div id="cover-spin"></div>
            <Router>
                <Fragment>
                    <>

                        <Switch>
                            <>
                                <Route path="/" exact component={SigninPage} />
                                <PrivateRoute path="/reports" component={ReportPage} />
                                <Route path={`/forget_password`} component={ForgetPassword} />
                                <PrivateRoute path="/paying" component={PayingPage} />
                                <PrivateRoute path="/dashboard" component={DashboardPage} />
                                <PrivateRoute path="/activity" component={ActivityPage} />
                                <PrivateRoute path="/assignedUser" component={AssignedChildrenPage} />
                                <PrivateRoute path="/attendance" component={AttendancePage} />
                                <AdminRoute path="/payments" component={PaymentPage} />
                                <AdminRoute path="/childrens" component={ChildrenPage} />
                                <AdminRoute path="/users" component={ManageUserPage} />
                            </>

                        </Switch>


                    </>
                </Fragment>
            </Router>
        </div>
    )
}
