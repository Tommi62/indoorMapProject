import ReactSvgViewer from "./ReactSvgViewer";
import MapColorcodeSVG from "./MapColorcodeSVG";
import { Button, ButtonGroup } from "@material-ui/core";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Menu, MenuItem, unstable_composeClasses } from "@mui/material";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import moment from 'moment';
import 'moment/locale/fi'
import data from "../Data/classrooms.json";
import { useApiData } from '../Hooks/ApiHooks';

/* const options = {
  backdrop: "static",
  button: false,
  navbar: false,
  title: false,
  inline: true,
  slideOnTouch: false,
  zIndex: 1,
  zoomRatio: 0.4,
  tooltip: false,
  toggleOnDblclick: false,
}; */

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  marker: string;
  setMarker: Function;
  modalOpen: any;
}

interface paramObj {
  startNode: string;
  endNode: string;
}

interface requestObj {
  group: string,
  room: string,
  realization: string,
  startDate: string,
  apiKey: string,
  apiUrl: string,
  rangeStart: string,
  rooms: string[],
}

const MapViewer = ({
  setModalOpen,
  setModalContent,
  setKeyWord,
  update,
  marker,
  setMarker,
  modalOpen,
}: propTypes) => {
  const [floorSelect, setFloorSelect] = useState<keyof typeof data>("7");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { postGetMetropoliaData } = useApiData();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeFloor = (e: any) => {
    setFloorSelect(e.target.innerText);
    setMarker("");
  };

  const getAvailableRooms = async () => {
    const dateNow = moment().locale('fi').format('YYYY-MM-DD');
    const timeNow = moment().locale('fi').format('LT').replace('.', ':');
    const now = dateNow + 'T' + timeNow;
    let roomArray = [];
    for (let i = 0; i < data[floorSelect].length; i++) {
      if (!data[floorSelect][i].name.startsWith('T') && !data[floorSelect][i].name.startsWith('S') && !data[floorSelect][i].name.startsWith('H')) {
        roomArray.push('KM' + data[floorSelect][i].name);
      }
    };
    let requestObject: requestObj = {
      group: '',
      room: '',
      realization: '',
      startDate: '',
      apiKey: '',
      apiUrl: '',
      rangeStart: now,
      rooms: roomArray,
    };
    const reservedRooms = await postGetMetropoliaData(requestObject);
    console.log('Reserved Rooms', reservedRooms, roomArray, now);
    if (reservedRooms.reservations.length !== 0) {
      for (let i = 0; i < reservedRooms.reservations.length; i++) {
        for (let j = 0; j < reservedRooms.reservations[i].resources.length; j++) {
          if (reservedRooms.reservations[i].resources[j].type === 'room') {
            roomArray = roomArray.filter(e => e !== reservedRooms.reservations[i].resources[j].code);
            break;
          }
        }
      }
    }
    console.log('Rooms available', roomArray);
    handleClose();
  };

  return (
    <>
      <ReactSvgViewer
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setKeyWord={setKeyWord}
        update={update}
        marker={marker}
        setMarker={setMarker}
        modalOpen={modalOpen}
        floor={floorSelect}
        setFloor={setFloorSelect}
      />
      <ButtonGroup orientation="vertical" className="floorButtons">
        <Button onClick={changeFloor}>7</Button>
        <Button onClick={changeFloor}>6</Button>
        <Button onClick={changeFloor}>5</Button>
        <Button onClick={changeFloor}>2</Button>
      </ButtonGroup>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        variant="contained"
        disableElevation
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="availableRoomsButton"
      >
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={getAvailableRooms}>Show available rooms</MenuItem>
      </Menu>
      <MapColorcodeSVG />
    </>
  );
};

export default MapViewer;
