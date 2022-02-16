
import React, { useState, memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FormControl } from '@material-ui/core';
import { useCreateUser } from '../../resources/useCreateUser';
import { useTranslation, Trans } from "react-i18next";

const useStyles2 = makeStyles({

  root: {
    display: "flex",
    marginLeft: '20px'
  },
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: 200,
  },

});

export const AddUser = () => {

  const classes = useStyles2();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [validation, setValidation] = useState('');
  const [validationCheck, setValidationCheck] = useState('');
  // const [formValidation, setFormValidation] = useState({
  //   fullName: '', userName: '', password: '', role: ''
  // })
  const [validName, setvalidName] = useState('');
  const [validEmail, setvalidEmail] = useState('');
  const [validPassword, setvalidPassword] = useState('');
  const [validRole, setvalidRole] = useState('');
  // using custom react query hook for fetching roles

  const mutation = useCreateUser()
  // const { isLoading, isError, data: roleData } = useContractorCompany(roleId);

  const { t } = useTranslation();
  const handleValidation = () => {
    let formIsValid = true;
    //Name
    if (fullName === '') {
      formIsValid = false;
      setvalidName("Full Name cannot be empty");
    } else {
      setvalidName("");
    }

    if (email === '') {
      formIsValid = false;
      setvalidEmail("email cannot be empty");
    } else {
      setvalidEmail("");
    }

    //Email
    if (password === '') {
      formIsValid = false;
      setvalidPassword("Password cannot be empty");
    } else {
      setvalidPassword("");
    }
    if (roleId === '') {
      formIsValid = false;
      setvalidRole("Role cannot be empty");
    } else {
      setvalidRole("");
    }
    return formIsValid;
  }
  // submit function

  const onCreateUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (handleValidation()) {
      setValidation("")
      mutation.mutate({
        name: fullName, email: email, password: password, role: roleId
      })

    }
  }



  return (
    <div className={classes.root}>
      <main className='width pr-20'>
        <div />
        <div className="livetabletitle">
          <Grid className={classes.table} container direction="row" alignItems="center">

            <Grid item>
              <p className="leftfloat">&nbsp;{t("Add New Users")}</p>
            </Grid>
          </Grid>
          <div className="gridpsacing">
          </div>
        </div>
        <div className="gridpsacing">
          <form className="manageUserFonts" onSubmit={onCreateUser}  >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Full Name")}*</label>
                  <span style={{ color: "red" }}>{validName}</span>
                  <input className="inputbox" type="text" placeholder={t("Add Full Name")} onChange={e => setFullName(e.target.value)} ></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Email")}*</label>
                  <span style={{ color: "red" }}>{validEmail}</span>
                  <input className="inputbox" type="email" placeholder={t("Email")} onChange={e => setEmail(e.target.value)}></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Password")}*</label>
                  <span style={{ color: "red" }}>{validPassword}</span>
                  <input className="inputbox" type="password" placeholder={t("Password")} onChange={e => setPassword(e.target.value)}></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Role")}*</label>
                  <span style={{ color: "red" }}>{validRole}</span>
                  <span style={{ color: "red" }}>{validation}</span>
                  <select className="inputbox" onChange={e => setRoleId(e.target.value)} >
                    <option value=''>{t("Select a Role")}</option>
                    <option value='Admin'>{t("Admin")}</option>
                    <option value='Teacher'>{t("Teacher")}</option>
                    <option value='Parent'>{t("Parent")}</option>
                  </select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  {mutation.isLoading ? (
                    'Creating Users ...'
                  ) : (
                    <>
                      {mutation.isError ? (
                        <div>An error occurred: {mutation.error}</div>
                      ) : null}
                      {mutation.isSuccess ? <div>{mutation.data?.data.message || mutation.data?.data.error}</div> : null}
                      <button
                        className="inputboxButton"
                        type="submit"
                      >{t("Create users")}</button>
                    </>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </div>
      </main>
    </div>
  );
}
