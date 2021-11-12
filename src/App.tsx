import React, {useEffect} from 'react';
import './App.css';
import RouteFinder from './Components/RouteFinder';
import Nav from './Components/Nav';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import {useReservations} from './Hooks/ApiHooks';
import MapViewer from './Components/MapViewer';

const useStyles = makeStyles(() => ({
    root: {}
}));

const App = () => {
    const classes = useStyles();
    const {postGetReservationsByStudentGroup} = useReservations();

    useEffect(() => {
        (async () => {
            try {

            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <Nav/>
            <Grid className={classes.root} container justifyContent="center">
                <Grid container item justifyContent="center">
                    <MapViewer/>
                    <RouteFinder/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
