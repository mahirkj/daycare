import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useAttendance from '../../resources/useAttendance';
import { useHistory } from 'react-router-dom';
import Eye from '../../assets/icon/View.png';
import TablePagination from '@material-ui/core/TablePagination';
import { FormControl, Grid, InputLabel, MenuItem, Select, TableFooter, TextField } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import Search from '../../assets/icon/Search.png';
import { TablePaginationActions } from '../Pagination'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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

export default function AttendanceListing() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('asc');
  const [total, setTotal] = useState(0)
  const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [payStatus, setpayStatus] = useState('All');
  const [attendanceList, setAttendanceList] = useState<Data[]>([]);

  const user_info = localStorage.getItem("user_info");
  let role = ''
  let id = ''
  if (user_info) {
    role = JSON.parse(user_info).role;
    id = JSON.parse(user_info).user_id
  }

  const { data, status, error, refetch } = useAttendance({
    date: startDate, user: id
  });
  const getUserData = () => {
    refetch()
    if (status === "success") {

      setAttendanceList(data?.attendance)
      setTotal(data?.count)
    }
  }

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
            <Grid item xs={12} sm={6} lg={10}>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>

              <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
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
                  {t("Check In")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Ckeck Out")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Date")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {

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
                    <TableCell align="left">{moment(row?.checkIn).format('h:mm:ss') === 'Invalid date' ? 'N/A' : `${moment(row?.checkIn).format('h:mm:ss')} am`}</TableCell>
                    <TableCell align="left">{moment(row?.checkOut).format('h:mm:ss') === 'Invalid date' ? 'N/A' : `${moment(row?.checkOut).format('h:mm:ss')} pm`}</TableCell>
                    <TableCell align="left">{moment(row?.date).format('YYYY-MM-DD')}</TableCell>
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
