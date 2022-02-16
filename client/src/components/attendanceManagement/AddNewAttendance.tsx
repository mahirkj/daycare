import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useChildren from '../../resources/useChildren';
import { useHistory } from 'react-router-dom';
import Eye from '../../assets/icon/View.png';
import TablePagination from '@material-ui/core/TablePagination';
import { Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TableFooter, TextField } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import Search from '../../assets/icon/Search.png';
import { TablePaginationActions } from '../Pagination';
import { useGenerateAttendance } from '../../resources/useGenerateAttendance';
import { useCreateAttendance } from '../../resources/useCreateAttendance';
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

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;

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
            maxWidth: 600,
        },
        date: {
            marginTop: "16px",
            height: "32px"
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
        tabelHeadTitle: {
            fontWeight: 700
        }
    }),
);

export default function AddNewAttendance(props: any) {
    const { t } = useTranslation();
    const [order, setOrder] = React.useState<Order>('asc');
    const [total, setTotal] = useState(0)
    const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    let history = useHistory();
    const [attendanceList, setAttendanceList] = useState<any>([]);
    const [amount, setAmount] = useState<any>('');
    const [time, setTime] = useState(new Date());
    const [checkTime, setCheckTime] = useState('checkIn');

    // const { data, status, error, refetch } = useChildren({
    //     search: search
    // });
    const mutation = useGenerateAttendance()
    const createMutation = useCreateAttendance()

    const getAttendanceData = () => {
        if (mutation.isSuccess) {

            setAttendanceList(mutation.data?.data?.attendance)
            setTotal(mutation.data?.data?.count)
        }

    }

    const generateAttendance = () => {
        const user_id = localStorage.getItem("user_info");
        if (user_id) {
            if (JSON.parse(user_id).user_id) {
                mutation.mutate({
                    user: JSON.parse(user_id).user_id, checkTime: checkTime
                })
            }
        }
    }

    useEffect(() => {
        getAttendanceData()
        generateAttendance()
    }, [checkTime])
    useEffect(() => {
        getAttendanceData()
    }, [mutation.isSuccess, checkTime])
    const classes = useStyles();

    const [dense, setDense] = React.useState(false);
    const onCreateAttendance = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (time && selected.length > 0) {
            createMutation.mutate({
                children: selected, checkTime: checkTime, time: time
            })
        } else {
            alert('Time is not selected  or  User is not selected')
        }


    }
    const { onSelectAllClick, numSelected, rowCount } =
        props;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = attendanceList.map((n: any) => n.children);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, children: string) => {

        const selectedIndex = selected.indexOf(children);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, children);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
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
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {

        setCheckTime(event.target.value as string);
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <div className="mrbDate">
                    <h4>Attendance for: {`${moment().format("dddd")}  ${moment().format("MMMM")}  ${moment().format("YYYY")}`}</h4>
                    <Grid container direction="row" alignItems="center">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Select</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={checkTime}
                                onChange={handleChange}
                            >
                                <MenuItem value={'checkIn'}>Check In</MenuItem>
                                <MenuItem value={'checkOut'}>Check Out</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid item xs={3} sm={3} lg={3}>
                            <div>
                                <DatePicker
                                    className={classes.date}
                                    selected={time}
                                    onChange={(date: any) => setTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
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
                                <TableCell padding="checkbox">
                                    <>
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.length > 0 && selected.length < total}
                                            checked={total > 0 && selected.length === total}
                                            onChange={handleSelectAllClick}
                                        />
                                        {t("Select All")}
                                    </>
                                </TableCell>
                                <TableCell
                                    className={classes.tabelHeadTitle}
                                >
                                    {t("Full Name")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendanceList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: any) => {
                                const isItemSelected = isSelected(row.children);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.children)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row?.children?.fullName}</TableCell>
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
                <div className="mrbDate">
                    <Grid container direction="row" alignItems="center">
                        <form className="manageUserFonts" onSubmit={onCreateAttendance}  >
                            <FormControl>
                                {createMutation.isLoading ? (
                                    'Adding Attendances ...'
                                ) : (
                                    <>
                                        {createMutation.isError ? (
                                            <div>An error occurred: {createMutation.error}</div>
                                        ) : null}
                                        {createMutation.isSuccess ? <div>{createMutation.data?.data.message || createMutation.data?.data.error}</div> : null}
                                        <button
                                            className="inputboxButton"
                                            type="submit"
                                        >{t("Submit")}</button>
                                    </>
                                )}
                            </FormControl>
                        </form>
                    </Grid>
                </div>

            </Paper>


        </div>
    );
}
