import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import usePayment from '../../resources/usePayment';
import { useHistory } from 'react-router-dom';
import Eye from '../../assets/icon/View.png';
import TablePagination from '@material-ui/core/TablePagination';
import { FormControl, Grid, InputLabel, MenuItem, Select, TableFooter, TextField } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import Search from '../../assets/icon/Search.png';
import { TablePaginationActions } from '../Pagination'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Data {
  Id: string,
  FullName: string;
  UserName: string;
  Role: string;
  Action: string;
}





type Order = 'asc' | 'desc';




interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'FullName', numeric: false, disablePadding: true, label: 'Full Name' },
  { id: 'Id', numeric: false, disablePadding: true, label: 'Full Name' },
  { id: 'UserName', numeric: true, disablePadding: false, label: 'Username' },
  { id: 'Role', numeric: true, disablePadding: false, label: 'Role' },
  { id: 'Action', numeric: true, disablePadding: false, label: 'Action' },
];






const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      padding: '9px',
      margin: '3px'
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    date: {
      marginTop: "16px",
      height: "32px"
    },
    tabelHeadTitle: {
      fontWeight: 700
    }
  }),
);

export default function PaymentListing() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('asc');
  const [total, setTotal] = useState(0)
  const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [dateMonth, settdateMonth] = useState(new Date());
  const [payStatus, setpayStatus] = useState('All');

  let history = useHistory();

  const user_info = localStorage.getItem("user_info");
  let role = ''
  let id = ''
  if (user_info) {
    role = JSON.parse(user_info).role;
    id = JSON.parse(user_info).user_id
  }
  const { data, status, error, refetch } = usePayment({
    search: { date: dateMonth, status: payStatus, role: role, id: id }
  });
  const getUserData = () => {
    refetch()
    if (status === "success") {

      setUsersList(data?.payment)
      setTotal(data?.count)
    }
  }
  const [usersList, setUsersList] = useState<Data[]>([]);

  useEffect(() => {
    getUserData()

  }, [data])
  const classes = useStyles();

  const [dense, setDense] = React.useState(false);




  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    //getUserData()
    //onRequestSort(event, property);

  };


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {

    setpayStatus(event.target.value as string);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <div className="mrbDate">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} sm={6} lg={8}>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payStatus}
                  onChange={handleChange}
                >
                  <MenuItem value={'All'}>All</MenuItem>
                  <MenuItem value={'Paid'}>Paid</MenuItem>
                  <MenuItem value={'Unpaid'}>Unpaid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>

              <DatePicker
                className={classes.date}
                selected={dateMonth}
                onChange={(date: any) => settdateMonth(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </Grid>
          </Grid>
        </div>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Children Name")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Amount")}
                </TableCell>

                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Month")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Year")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Status")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {

                return (
                  <TableRow
                    hover
                    onClick={(event) => { }}
                    role="checkbox"
                    aria-checked={true}
                    tabIndex={-1}
                    key={index}
                    selected={false}
                  >


                    <TableCell align="left">{row?.children?.fullName}</TableCell>
                    <TableCell align="left">{`${row?.amount} £`}</TableCell>
                    <TableCell align="left">{row?.month}</TableCell>
                    <TableCell align="left">{row?.year}</TableCell>
                    <TableCell align="left">
                      <div
                        style={
                          row?.status === 'Unpaid' ?
                            { backgroundColor: '#EF4349', textAlign: 'center', marginRight: '30px', height: '27px', padding: '5px', borderRadius: '5px', color: 'white' } :
                            { backgroundColor: '#14A651', textAlign: 'center', marginRight: '30px', height: '27px', padding: '5px', borderRadius: '5px', color: 'white' }}>
                        {row?.status}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={3}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

      </Paper>


    </div>
  );
}
