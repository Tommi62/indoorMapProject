import React, { useState } from "react";
import "./App.css";
// import RouteFinder from './Components/RouteFinder';
import Nav from "./Components/Nav";
import { Grid, makeStyles } from "@material-ui/core";
import Modal from "./Components/Modal";
import MapViewer from "./Components/MapViewer";
import data from "./Data/classrooms.json";

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
  const [updateOwnList, setUpdateOwnList] = useState(Date.now());
  const [floorSelect, setFloorSelect] = useState<keyof typeof data>("2");
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
  const [noOwnListNotification, setNoOwnListNotification] = useState(false);

  const [update, setUpdate] = useState({
    startNode: "",
    endNode: "",
  });

  return (
    <>
      <Nav
        setMarker={setMarker}
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setKeyWord={setKeyWord}
        updateShortcuts={updateShortcuts}
        setRestaurantMenu={setRestaurantMenu}
        floorSelect={floorSelect}
        setFloorSelect={setFloorSelect}
      />
      <Grid className={classes.root} container justifyContent="center">
        <Grid container item justifyContent="center">
          <MapViewer
            floorSelect={floorSelect}
            setFloorSelect={setFloorSelect}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setModalContent={setModalContent}
            setKeyWord={setKeyWord}
            update={update}
            marker={marker}
            setMarker={setMarker}
            setNoOwnListNotification={setNoOwnListNotification}
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
        updateOwnList={updateOwnList}
        setUpdateOwnList={setUpdateOwnList}
        restaurantMenu={restaurantMenu}
        setRestaurantMenu={setRestaurantMenu}
        noOwnListNotification={noOwnListNotification}
        setNoOwnListNotification={setNoOwnListNotification}
      />
    </>
  );
};

export default App;
