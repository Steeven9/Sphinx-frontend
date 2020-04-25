import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        borderRadius: 16,
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
        <div className='container'>
            <Grid container
                  className='dashboard-nav'
                  padding={4}
                  spacing={6}
                  wrap={'wrap'}
                  alignItems={'center'}
                  align={'center'}
                  justify={'center'}
                  style={{
                      margin: 0,
                      width: '100%',
                  }}>
                <Grid item lg={4} md={6} xs={12}>
                    <a href="/devices">
                        <Paper className={classes.paper}>
                            <img alt="Devices" className="dashboard-nav-img"
                                 src="/img/icons/dashboard/icon-all-devices-bw.svg"/>
                            <p>Devices</p>
                        </Paper>
                    </a>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <a href="/house">
                        <Paper className={classes.paper}>
                            <img alt="Rooms" className="dashboard-nav-img"
                                 src="/img/icons/dashboard/icon-all-rooms-bw.svg"/>
                            <p>Rooms</p>
                        </Paper>
                    </a>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <a href="/scenes">
                        <Paper className={classes.paper}>
                            <img alt="Scenes" className="dashboard-nav-img"
                                 src="/img/icons/dashboard/icon-scenes-bw.svg"/>
                            <p>Scenes</p>
                        </Paper>
                    </a>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <a href="/automations">
                        <Paper className={classes.paper}>
                            <img alt="automations" className="dashboard-nav-img"
                                 src="/img/icons/dashboard/icon-automation-bw.svg"/>
                            <p>Automations</p>
                        </Paper>
                    </a>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <a href="/guests">
                        <Paper className={classes.paper}>
                            <img alt="Guests" className="dashboard-nav-img"
                                 src="/img/icons/dashboard/icon-guests-bw.svg"/>
                            <p>Guests</p>
                        </Paper>
                    </a>
                </Grid>
            </Grid>
        </div>
    );
}

export {DashboardMenu as default}
