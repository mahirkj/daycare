import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useChildrenDetail from '../../resources/useChildrenDetail';
import { useHistory } from 'react-router-dom';
import Eye from '../../assets/icon/View.png';
import TablePagination from '@material-ui/core/TablePagination';
import { Grid, TableFooter, TextField } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import Search from '../../assets/icon/Search.png';
import { TablePaginationActions } from '../Pagination'
import { useParams } from "react-router-dom";
const moment = require('moment');

interface Data {
  email: string;
  name: string;
  Id: string,
  FullName: string;
  UserName: string;
  Role: string;
  role: string;
  Action: string;
  fullName: string,
  age: string,
  gender: string,
  user: string,
  parent: string
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
    tabelHeadTitle: {
      fontWeight: 700
    }
  }),
);

export default function ChildrenDetailList() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('asc');
  const [total, setTotal] = useState(0)
  const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  let history = useHistory();
  const [attendanceList, setAttendanceList] = useState<any>([]);
  const [childrenList, setChildrenList] = useState<any>({});
  const { id, role } = useParams<{ id: string, role: string }>()
  const { data, status, error, refetch } = useChildrenDetail({
    id: id
  });
  const getUserData = () => {
    refetch()
    if (status === "success") {

      setAttendanceList(data?.attendance)
      setTotal(data?.attendance.length)
      setChildrenList(data?.children)
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

  return (
    <>
      <div className="text-left">
        <h3>Children Detail</h3>
      </div>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
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
                    {t("Full Name")}
                  </TableCell>
                  <TableCell
                    className={classes.tabelHeadTitle}
                  >
                    {t("Gender")}
                  </TableCell>
                  <TableCell
                    className={classes.tabelHeadTitle}
                  >
                    {t("Age")}
                  </TableCell>
                  <TableCell
                    className={classes.tabelHeadTitle}
                  >
                    {t("Parent")}
                  </TableCell>

                  <TableCell
                    className={classes.tabelHeadTitle}
                  >
                    {t("Teacher")}
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  hover
                  onClick={(event) => { }}
                  role="checkbox"
                  aria-checked={true}
                  tabIndex={-1}
                  selected={false}
                >
                  <TableCell align="left">{childrenList?.fullName}</TableCell>
                  <TableCell align="left">{childrenList?.gender}</TableCell>
                  <TableCell align="left">{childrenList?.age}</TableCell>
                  <TableCell align="left">{childrenList?.parent?.name}</TableCell>
                  <TableCell align="left">{childrenList?.user?.name}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <>
        {role !== 'Admin'
          ?
          <>
            <div className="text-left">
              <h3>Attendance</h3>
            </div>
            <div className={classes.root}>
              <Paper className={classes.paper} elevation={3}>
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
                      {attendanceList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: string) => {

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
          </>
          :
          null
        }
      </>

    </>
  );
}


