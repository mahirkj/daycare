import React, { useEffect } from 'react'
import { SideBar } from '../../components/SideBar'
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut, Bar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import useDashboard from '../../resources/useDashboard';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar
}));



export const Dashboard = () => {
  const classes = useStyles();
  const [dashData, setDashData] = React.useState<any>({});
  const { data, status, error, refetch } = useDashboard({

  });
  const getData = () => {
    refetch()
    if (status === "success") {
      setDashData(data)
    }
  }

  useEffect(() => {
    getData()
  }, [data])

  const doughnut = {
    labels: ['Male', 'female', 'Other'],
    datasets: [
      {
        backgroundColor: [
          '#EF4349',
          '#616B80',
          ' #8D6DB2'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
        ],
        data: [dashData?.maleChildren, dashData?.femaleChildren, dashData?.otherChildren]
      }
    ]
  }
  const year =  moment().format('YYYY')  
  const bar = {
    labels: ['January', 'February', 'March',
      'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'No of children',
        backgroundColor: '#EF4349',
        borderColor: '#EF4349',
        borderWidth: 2,
        data: [
          dashData?.dataByMonth?.[`January-${year}`],
          dashData?.dataByMonth?.[`February-${year}`],
          dashData?.dataByMonth?.[`March-${year}`],
          dashData?.dataByMonth?.[`April-${year}`],
          dashData?.dataByMonth?.[`May-${year}`],
          dashData?.dataByMonth?.[`June-${year}`],
          dashData?.dataByMonth?.[`July-${year}`],
          dashData?.dataByMonth?.[`August-${year}`],
          dashData?.dataByMonth?.[`September-${year}`],
          dashData?.dataByMonth?.[`October-${year}`],
          dashData?.dataByMonth?.[`November-${year}`],
          dashData?.dataByMonth?.[`December-${year}`]]
      }

    ]
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid spacing={2} container direction="row">
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box display="flex" className="paper">
              <Paper className="paper" elevation={3} >
                <p className="doughnutTitle">Registered children</p>
                <p className="doughnutText" >-</p>
                <Chart
                  data={doughnut}
                  type='doughnut'
                  options={{
                    // title:{
                    //   display:true,
                    //   text:'Average Rainfall per month',
                    //   fontSize:20
                    // },
                    // legend:{
                    //   display:true,
                    //   position:'right'
                    // }
                  }}
                />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            <Box display="flex" className="paper">
              <Paper className="paper" elevation={3} >
                <p className="doughnutTitle">Yearly Stats</p>
                <p className="doughnutText" >Total Children enrolled each month</p>
                <Chart
                  type='bar'
                  data={bar}
                  options={{
                    // title:{
                    //   display:true,
                    //   text:'Average Rainfall per month',
                    //   fontSize:20
                    // },
                    // legend:{
                    //   display:true,
                    //   position:'right'
                    // }
                  }}
                />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Box display="flex" textAlign='center' className="paper">
              <Paper style={{ backgroundColor: '#373D49', color: 'white' }} className="paper" elevation={3} >
                <p className="doughnutTitle">Total Parent</p>
                <p style={{ fontSize: '35px' }}>{dashData?.parentCount}</p>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Box display="flex" textAlign='center' className="paper">
              <Paper style={{ backgroundColor: '#373D49', color: 'white' }} className="paper" elevation={3} >
                <p className="doughnutTitle">Total Teacher</p>
                <p style={{ fontSize: '35px' }}>{dashData?.teacherCount}</p>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <Box display="flex" textAlign='center' className="paper">
              <Box display="flex" textAlign='center' className="paper">
                <Paper style={{ backgroundColor: '#373D49', color: 'white' }} className="paper" elevation={3} >
                  <p className="doughnutTitle">Total Children</p>
                  <p style={{ fontSize: '35px' }}>{dashData?.childrenCount}</p>
                </Paper>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </main>
    </div>
  )
}
