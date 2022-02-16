import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { FormControl, Grid, InputLabel, MenuItem, Select, TableFooter, TextareaAutosize, TextField } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import Search from '../../assets/icon/Search.png';
import { TablePaginationActions } from '../Pagination';
import { useCreateActivity } from '../../resources/useCreateActivity';
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

export default function AddNewActivity(props: any) {
    const { t } = useTranslation();
    let history = useHistory();
    const [activity, setActivity] = useState<any>('');

    // const { data, status, error, refetch } = useChildren({
    //     search: search
    // });
    const createMutation = useCreateActivity()
    const classes = useStyles();

    const onCreateActivity = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (activity) {
            const user_id = localStorage.getItem("user_info");
            if (user_id) {
                if (JSON.parse(user_id).user_id) {
                    createMutation.mutate({
                        activity: activity, user: JSON.parse(user_id).user_id
                    })
                }
            }

        } else {
            alert('Activity is empty')
        }


    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <div className="mrbDate">
                    <h4>Activity for: {`${moment().format("dddd")}  ${moment().format("MMMM")}  ${moment().format("YYYY")}`}</h4>
                </div>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    value={activity}
                    onChange={(e: any) => setActivity(e.target.value)}
                    placeholder="Type....."
                    style={{ width: "100%" }}
                />
                <div className="mrbDate">
                    <Grid container direction="row" alignItems="center">
                        <form className="manageUserFonts" onSubmit={onCreateActivity}  >
                            <FormControl>
                                {createMutation.isLoading ? (
                                    'Adding Activity ...'
                                ) : (
                                    <>
                                        {createMutation.isError ? (
                                            <div>An error occurred: {createMutation.error}</div>
                                        ) : null}
                                        {createMutation.isSuccess ? <div>{createMutation.data?.data.message || createMutation.data?.data.error}</div> : null}
                                        <button
                                            className="inputboxButton"
                                            type="submit"
                                        >{t("Add  Activity")}</button>
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
