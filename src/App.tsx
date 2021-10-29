import React, { useEffect } from 'react';
import './App.css';
import Nav from './Components/Nav';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useReservations } from './Hooks/ApiHooks';

const useStyles = makeStyles(() => ({
  root: {
  }
}));

const App = () => {
  const classes = useStyles();
  const { postGetReservationsByStudentGroup } = useReservations();

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
      <Nav />
      <Grid className={classes.root} container justifyContent="center">
        <Grid container item justifyContent="center" >
          <Typography component="h2" variant="h2" style={{ textAlign: 'center' }}>
            Hello World!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
