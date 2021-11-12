import React, { useEffect, useState } from 'react';
import './App.css';
// import RouteFinder from './Components/RouteFinder';
import Nav from './Components/Nav';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Modal from './Components/Modal';
import MapViewer from './Components/MapViewer';

const useStyles = makeStyles(() => ({
  root: {}
}));

interface modalContentArray {
  success: boolean,
  name: string,
  group: string,
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
    group: '',
    room: '',
    startDate: '',
    endDate: ''
  }]);

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

  return (
    <>
      <Nav setModalOpen={setModalOpen} setModalContent={setModalContent} />
      <Grid className={classes.root} container justifyContent="center">
        <Grid container item justifyContent="center" >
          <Typography component="h2" variant="h2" style={{ textAlign: 'center' }}>
            Hello World!
          </Typography>
          <MapViewer update={update}/>
        </Grid>
      </Grid>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} modalContent={modalContent} setModalContent={setModalContent} />
    </>
  );
}

export default App;
