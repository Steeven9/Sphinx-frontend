import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        // direction: 'row',
        // justify: 'center',
        // // alignItems: 'center',
        // flexGrow: 1,
        // marginTop: 100,
        // spacing: 3,
    },
    paper: {
        padding: theme.spacing(2),
        spacing: 5,
        textAlign: 'center',
        height: 250,
        width: 300,
        color: '#580B71',
        fontSize: 'calc(60% + 1vmin)',
        fontWeight: 'bold',
    },
}));

function DashboardMenu() {
    const classes = useStyles();

    return (
        <Grid container className='dashboard-nav' xs={6} spacing={3} flexGrow={1} justify={'center'}
              alignItems={'center'}>
            <Grid item>
                <a href="/devices">
                    <Paper className={classes.paper}>
                        <img className="dashboard-nav-img" src="/img/icons/dashboard/icon-all-devices.svg"
                             alt="All devices"/>
                        <p>See all rooms</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/house">
                    <Paper className={classes.paper}>
                        <img className="dashboard-nav-img" src="/img/icons/dashboard/icon-all-rooms.svg"
                             alt="All devices"/>
                        <p>See devices by room</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/automation">
                    <Paper className={classes.paper}>
                        <img className="dashboard-nav-img" src="/img/icons/dashboard/icon-automation.svg"
                             alt="All devices"/>
                        <p>Automation</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/guests">
                    <Paper className={classes.paper}>
                        <img className="dashboard-nav-img" src="/img/icons/dashboard/icon-guests.svg"
                             alt="All devices"/>
                        <p>Guests</p>
                    </Paper>
                </a>
            </Grid>
        </Grid>
    );
}

export {DashboardMenu as default}