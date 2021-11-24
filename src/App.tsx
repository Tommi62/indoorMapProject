import React, { useEffect, useState } from "react";
import "./App.css";
// import RouteFinder from './Components/RouteFinder';
import Nav from "./Components/Nav";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Modal from "./Components/Modal";
import MapViewer from "./Components/MapViewer";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {},
}));

interface modalContentArray {
  success: boolean;
  name: string;
  group: string;
  room: string;
  startDate: string;
  endDate: string;
}

const App = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [updateShortcuts, setUpdateShortcuts] = useState(Date.now());
  const [modalContent, setModalContent] = useState<modalContentArray[]>([
    {
      success: false,
      name: "",
      group: "",
      room: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [restaurantMenu, setRestaurantMenu] = useState(false);
  const [marker, setMarker] = useState("");

  const [update, setUpdate] = useState({
    startNode: "",
    endNode: "",
  });

  const button = () => {
    setUpdate({
      startNode: "H21",
      endNode: "V21",
    });
  };

  return (
    <>
      <Nav
        setMarker={setMarker}
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setKeyWord={setKeyWord}
        updateShortcuts={updateShortcuts}
        setRestaurantMenu={setRestaurantMenu}
      />
      <Grid className={classes.root} container justifyContent="center">
        <Button onClick={button}>Click me</Button>
        <Grid container item justifyContent="center">
          <MapViewer
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setModalContent={setModalContent}
            setKeyWord={setKeyWord}
            update={update}
            marker={marker}
            setMarker={setMarker}
          />
        </Grid>
      </Grid>
      <Modal
        setMarker={setMarker}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
        setModalContent={setModalContent}
        keyWord={keyWord}
        updateShortcuts={updateShortcuts}
        setUpdateShortcuts={setUpdateShortcuts}
        restaurantMenu={restaurantMenu}
        setRestaurantMenu={setRestaurantMenu}
      />
    </>
  );
};

export default App;
