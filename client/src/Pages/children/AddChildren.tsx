
import React, { useState, memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FormControl } from '@material-ui/core';
import { useCreateChildren } from '../../resources/useCreateChildren';
import { useTranslation, Trans } from "react-i18next";
import { Multiselect } from 'multiselect-react-dropdown';
import useTeacher from '../../resources/useTeacher';
import useParent from '../../resources/useParent';

const useStyles2 = makeStyles({

  root: {
    display: "flex",
    marginLeft:'20px'
  },
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: 200,
  },

});

export const AddChildren = () => {

  const classes = useStyles2();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [parent, setParent] = useState('');
  const [teacher, setTeacher] = useState('');
  const [validation, setValidation] = useState('');
  const [validationCheck, setValidationCheck] = useState('');
  const [validName, setvalidName] = useState('');
  const [validGender, setvalidGender] = useState('');
  const [validAge, setvalidAge] = useState('');
  const [validParent, setvalidParent] = useState('');
  const [validTeacher, setvalidTeacher] = useState('');

  // using custom react query hook for fetching roles

  const mutation = useCreateChildren()
  // const { isLoading, isError, data: roleData } = useContractorCompany(roleId);

  const { t } = useTranslation();
  const handleValidation = () => {
    let formIsValid = true;
    //Name
    if (fullName === '') {
      formIsValid = false;
      setvalidName('Full Name cannot be empty')
      setValidationCheck('Full Name cannot be empty')
    } else {
      setvalidName('')
    }

    if (gender === '') {
      formIsValid = false;
      setvalidGender("gender cannot be empty")
      setValidationCheck('gender cannot be empty')
    } else {
      setvalidGender("")
    }
    if (age === '') {
      formIsValid = false;
      setvalidAge("Age cannot be empty")
      setValidationCheck('Age cannot be empty')
    } else {
      setvalidAge("")
    }
    if (!parent) {
      formIsValid = false;
      setvalidParent("parent can not be empty")
      setValidationCheck('parent can not be empty')
    } else {
      setvalidParent("")
    }
    if (!teacher) {
      formIsValid = false;
      setvalidTeacher("Teacher can not be empty")
      setValidationCheck('Teacher can not be empty')
    } else {
      setvalidTeacher("")
    }
    return formIsValid;
  }
  // submit function

  const onCreateUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (handleValidation()) {
      setValidation("")
      mutation.mutate({
        fullName: fullName, age: age, gender: gender, user: teacher, parent: parent
      })

    }
  }

  const { data, status, error, refetch } = useTeacher();
  const { data: parentData } = useParent();

  const onSelectTeacher: any = (selectedList: any) => {
    console.log('unslected', selectedList[0]?._id);
    setTeacher(selectedList[0]?._id)
  }
  const onSelectParent: any = (selectedList: any) => {
    console.log('unslected', selectedList[0]?._id);
    setParent(selectedList[0]?._id)
  }


  return (
    <div className={classes.root}>
      <main className='width pr-20'>
        <div />
        <div className="livetabletitle">
          <Grid className={classes.table} container direction="row" alignItems="center">

            <Grid item>
              <p className="leftfloat">&nbsp;{t("Add New Children")}</p>
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
                  <label>{t("Age")}*</label>
                  <span style={{ color: "red" }}>{validAge}</span>
                  <input className="inputbox" type="number" min="0" max='10' placeholder={t("Age")} onChange={e => setAge(e.target.value)}></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Gender")}*</label>
                  <span style={{ color: "red" }}>{validGender}</span>
                  <span style={{ color: "red" }}>{validation}</span>
                  <select className="inputbox" onChange={e => setGender(e.target.value)} >
                    <option value=''>{t("Select a Gender")}</option>
                    <option value='Male'>{t("Male")}</option>
                    <option value='Female'>{t("Female")}</option>
                    <option value='Other'>{t("Other")}</option>
                  </select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="create_user_input">
                  <p>{t("Select a Teacher")}</p>
                  <span style={{ color: "red" }}>{validTeacher}</span>
                  <Multiselect
                    id="8"
                    singleSelect
                    options={data} // Options to display in the dropdown
                    onSelect={(selectedList, selectedItem) => onSelectTeacher(selectedList, selectedItem)} // Function will trigger on select event
                    // selectedValues={data}
                    onRemove={(selectedList, selectedItem) => onSelectTeacher(selectedList, selectedItem)} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="create_user_input">
                  <p>{t("Select a Parent")}</p>
                  <span style={{ color: "red" }}>{validParent}</span>
                  <Multiselect
                    id="8"
                    singleSelect
                    options={parentData} // Options to display in the dropdown
                    onSelect={(selectedList, selectedItem) => onSelectParent(selectedList, selectedItem)} // Function will trigger on select event
                    // selectedValues={data}
                    onRemove={(selectedList, selectedItem) => onSelectParent(selectedList, selectedItem)} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
              </Grid>
              <Grid>
                <FormControl>
                  {mutation.isLoading ? (
                    'Adding Children ...'
                  ) : (
                    <>
                      {mutation.isError ? (
                        <div>An error occurred: {mutation.error}</div>
                      ) : null}
                      {mutation.isSuccess ? <div>{mutation.data?.data.message || mutation.data?.data.error}</div> : null}
                      <button
                        className="inputboxButton"
                        type="submit"
                      >{t("Add Children")}</button>
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
