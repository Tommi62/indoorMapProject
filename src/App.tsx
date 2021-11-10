import React, {useEffect, useState} from 'react';
import './App.css';
import {graph} from './Components/RouteFinder';
import Nav from './Components/Nav';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {useReservations} from './Hooks/ApiHooks';
import MapViewer from './Components/MapViewer';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const useStyles = makeStyles(() => ({
    root: {}
}));

const App = () => {
    const classes = useStyles();
    const {postGetReservationsByStudentGroup} = useReservations();

    const [update, setUpdate] = useState({
        startNode: "",
        endNode: ""
    })

    const button = () => {
        setUpdate({
            startNode: "H1",
            endNode: "E7611"
        })
    }


    useEffect(() => {
        (async () => {
            try {
                const list = graph.keys
                console.log("list: " + list)
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>

            <Nav/>
            <Grid className={classes.root} container justifyContent="center">

                {/*

                <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={graph.map((option: { title: any; }) => option.title)}
                        renderInput={(params) => <TextField {...params} label="freeSolo" />}
                    />
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </Stack>

                */}

                <Button onClick={button}>
                    Click me
                </Button>
                <Grid container item justifyContent="center">
                    <Typography component="h2" variant="h2" style={{textAlign: 'center'}}>
                        Hello World!
                    </Typography>
                    <MapViewer update={update}/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
