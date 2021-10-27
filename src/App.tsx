import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '3rem'
  }
}));

const App = () => {
  const classes = useStyles();

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
