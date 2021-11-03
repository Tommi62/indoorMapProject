import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Modal from './Components/Modal';

const useStyles = makeStyles(() => ({
  root: {
  }
}));

interface modalContentArray {
  success: boolean,
  name: string,
  room: string,
  startDate: string,
  endDate: string,
}

const App = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<modalContentArray[]>([{
    success: false,
    name: '',
    room: '',
    startDate: '',
    endDate: ''
  }]);

  return (
    <>
      <Nav setModalOpen={setModalOpen} setModalContent={setModalContent} />
      <Grid className={classes.root} container justifyContent="center">
        <Grid container item justifyContent="center" >
          <Typography component="h2" variant="h2" style={{ textAlign: 'center' }}>
            Hello World!
          </Typography>
        </Grid>
      </Grid>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} modalContent={modalContent} setModalContent={setModalContent} />
    </>
  );
}

export default App;
