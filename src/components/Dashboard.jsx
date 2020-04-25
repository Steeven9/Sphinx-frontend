import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
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

function Dashboard() {
    const classes = useStyles();

    return (
        <Grid container className='dashboard-nav' xs={9} spacing={3} flexGrow={1} justify={'center'}
              alignItems={'center'}>
            <Grid item>
                <a href="/devices">
                    <Paper className={classes.paper}>
                        <img alt="Devices" className="dashboard-nav-img" src="/img/icons/dashboard/icon-all-devices-bw.svg"/>
                        <p>Devices</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/house">
                    <Paper className={classes.paper}>
                        <img alt="Rooms"className="dashboard-nav-img" src="/img/icons/dashboard/icon-all-rooms-bw.svg"/>
                        <p>Rooms</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/scenes">
                    <Paper className={classes.paper}>
                        <img alt="Scenes" className="dashboard-nav-img" src="/img/icons/dashboard/icon-scenes-bw.svg"/>
                        <p>Scenes</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/automation">
                    <Paper className={classes.paper}>
                        <img alt="Automations" className="dashboard-nav-img" src="/img/icons/dashboard/icon-automation-bw.svg"/>
                        <p>Automations</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/guests">
                    <Paper className={classes.paper}>
                        <img alt="Guests" className="dashboard-nav-img" src="/img/icons/dashboard/icon-guests-bw.svg"/>
                        <p>Guests</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/sharedWithMe">
                    <Paper className={classes.paper}>
                        <img alt="Shared-With-Me" className="dashboard-nav-img" src="/img/icons/dashboard/icon-house-guest.svg"/>
                        <p>Shared With Me</p>
                    </Paper>
                </a>
            </Grid>
        </Grid>
    );
}

export {Dashboard as default}