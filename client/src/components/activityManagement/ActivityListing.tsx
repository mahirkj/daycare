import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useActivityList from '../../resources/useActivityList';
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

export default function ActivityListing() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('asc');
  const [total, setTotal] = useState(0)
  const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [startDate, setStartDate] = useState(null);
  const [payStatus, setpayStatus] = useState('All');
  const [activityList, setActivityList] = useState<Data[]>([]);
  const [open, setOpen] = React.useState(false);
  const [modelData, setModelData] = React.useState<any>({});

  const user_info = localStorage.getItem("user_info");
  let role = ''
  let id = ''
  if (user_info) {
    role = JSON.parse(user_info).role;
    id = JSON.parse(user_info).user_id
  }

  const { data, status, error, refetch } = useActivityList({
    user: id, date: startDate
  });
  const getActivityData = () => {
    refetch()
    if (status === "success") {

      setActivityList(data?.activity)
      setTotal(data?.count)
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
                  {t("Activity")}
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
              {activityList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {

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
                      <span
                        style={{
                          display: "inline-block",
                          width: "180px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>
                        {row?.activity}
                      </span>
                    </TableCell>
                    <TableCell align="left">{moment(row?.date).format('YYYY-MM-DD') === 'Invalid date' ? 'N/A' : moment(row?.date).format('YYYY-MM-DD')}</TableCell>
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
          <h3>Date</h3>
          <p>{moment(modelData?.date).format('YYYY-MM-DD') === 'Invalid date' ? 'N/A' : moment(modelData?.date).format('YYYY-MM-DD')}</p>
          <h3>Activity</h3>
          <p>{modelData?.activity}</p>
        </Box>
      </Modal>
    </div >
  );
}
