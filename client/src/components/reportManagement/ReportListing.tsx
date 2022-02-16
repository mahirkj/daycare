import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useReportList from '../../resources/useReportList';
import TablePagination from '@material-ui/core/TablePagination';
import { Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TableFooter, TextField, Typography } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import { TablePaginationActions } from '../Pagination'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Eye from '../../assets/icon/View.png';

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

export default function ReportListing() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('asc');
  const [total, setTotal] = useState(0)
  const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [startDate, setStartDate] = useState(null);
  const [payStatus, setpayStatus] = useState('All');
  const [reportList, setReportList] = useState<Data[]>([]);
  const [open, setOpen] = React.useState(false);
  const [modelData, setModelData] = React.useState<any>({});

  const user_info = localStorage.getItem("user_info");
  let role = ''
  let id = ''
  if (user_info) {
    role = JSON.parse(user_info).role;
    id = JSON.parse(user_info).user_id
  }

  const { data, status, error, refetch } = useReportList({
    id: id, date: startDate, role
  });
  const getActivityData = () => {
    refetch()
    if (status === "success") {

      setReportList(data?.logs)
      setTotal(data?.logs?.length)
    }
  }

  useEffect(() => {
    getActivityData()
  }, [data])
  const classes = useStyles();

  const [dense, setDense] = React.useState(false);
  const handleOpen = (data: any) => {
    setOpen(true);
    setModelData(data)
  }
  const handleClose = () => setOpen(false);



  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    //getUserData()
    //onRequestSort(event, property);

  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
    backgroundColor: '#373D49'
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
              <div>
                <DatePicker
                  selected={startDate}
                  placeholderText={"Select a Date"}
                  onChange={(date: any) => setStartDate(date)}
                />
              </div>

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
                  {t("Teacher")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Parent")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Activity")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Check IN Time")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Check OUT Time")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Date")}
                </TableCell>
                <TableCell
                  className={classes.tabelHeadTitle}
                >
                  {t("Action")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {

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
                    <TableCell align="left">
                      {row?.children?.fullName}
                    </TableCell>
                    <TableCell align="left">
                      {row?.user?.name}
                    </TableCell>
                    <TableCell align="left">
                      {row?.parent?.name}
                    </TableCell>
                    <TableCell align="left">
                      <span
                        style={{
                          display: "inline-block",
                          width: "180px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>
                        {row?.dailyActivity?.activity}
                      </span>
                    </TableCell>
                    <TableCell align="left">{row?.attendance?.checkIn ? moment(row?.attendance?.checkIn).format('hh:mm:ss a') : 'N/A'}</TableCell>
                    <TableCell align="left">{row?.attendance?.checkOut ? moment(row?.attendance?.checkOut).format('hh:mm:ss a') : 'N/A'}</TableCell>
                    <TableCell align="left">{row?.attendance?.date ? moment(row?.attendance?.date).format("YYYY-MM-DD") : 'N/A'}</TableCell>

                    <TableCell align="left">
                      <div
                        onClick={
                          () => handleOpen(row)
                        }
                      ><img src={Eye} className="eyeIcon" alt="" />
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2} sm={2} lg={2}>
              <h3>Name:</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <p>{modelData?.children?.fullName}</p>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2} sm={2} lg={2}>
              <h3>Teacher:</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <p>{modelData?.user?.name}</p>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2} sm={2} lg={2}>
              <h3>Check IN:</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <h3>{modelData?.attendance?.checkIn ? moment(modelData?.attendance?.checkIn).format('hh:mm:ss a') : 'N/A'}</h3>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2} sm={2} lg={2}>
              <h3>Check Out:</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <h3>{modelData?.attendance?.checkOut ? moment(modelData?.attendance?.checkOut).format('hh:mm:ss a') : 'N/A'}</h3>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2} sm={2} lg={2}>
              <h3>Date:</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <h3>{modelData?.attendance?.date ? moment(modelData?.attendance?.date).format('YYYY-MM-DD') : 'N/A'}</h3>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2} sm={2} lg={2}>
              <h3>Activity:</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <h3>{modelData?.dailyActivity?.activity}</h3>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div >
  );
}
