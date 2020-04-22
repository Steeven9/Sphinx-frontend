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

function GuestsDashboard() {
    const classes = useStyles();

    return (
        <Grid container className='dashboard-nav' xs={9} spacing={3} flexGrow={1} justify={'center'}
              alignItems={'center'}>
            <Grid item>
                <a href="/myGuests">
                    <Paper className={classes.paper}>
                        <img alt="My-Guests" className="dashboard-nav-img" src="/img/icons/dashboard/icon-all-devices-bw.svg"/>
                        <p>My Guests</p>
                    </Paper>
                </a>
            </Grid>
            <Grid item>
                <a href="/Hosts">
                    <Paper className={classes.paper}>
                        <img alt="Shared-With-Me"className="dashboard-nav-img" src="/img/icons/dashboard/icon-all-rooms-bw.svg"/>
                        <p>Shared With Me</p>
                    </Paper>
                </a>
            </Grid>
        </Grid>
    );
}

export {GuestsDashboard as default}