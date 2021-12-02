import ReactSvgViewer from "./ReactSvgViewer";
import MapColorcodeSVG from "./MapColorcodeSVG";
import { Button, ButtonGroup } from "@material-ui/core";
import { useState, useEffect } from "react";
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
  floorSelect: keyof typeof data;
  setFloorSelect: Function;
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
  floorSelect,
  setFloorSelect,
}: propTypes) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { postGetMetropoliaData } = useApiData();
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [active7, setActive7] = useState("");
  const [active6, setActive6] = useState("");
  const [active5, setActive5] = useState("");
  const [active2, setActive2] = useState("");

  const changeFloor = (e: any) => {
    console.log('LOGI', e.target.id);
    if (e.target.id === '') {
      setFloorSelect(e.target.innerText)
    } else {
      setFloorSelect(e.target.id);
    }
    setMarker("");
    setAvailableRooms([]);
  };

  const getAvailableRooms = async () => {
    const dateNow = moment().locale('fi').format('YYYY-MM-DD');
    const timeNow = moment().locale('fi').format('LT').replace('.', ':');
    const now = dateNow + 'T' + timeNow;
    let roomArray = [];
    for (let i = 0; i < data[floorSelect].length; i++) {
      if (!data[floorSelect][i].name.startsWith('V') && !data[floorSelect][i].name.startsWith('S') && !data[floorSelect][i].name.startsWith('H')) {
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
    setAvailableRooms(roomArray);
    handleClose();
  };
  useEffect(() => {
    try {
      if (floorSelect === "7") {
        setActive7("buttonActive");
      } else {
        setActive7("");
      }
      if (floorSelect === "6") {
        setActive6("buttonActive");
      } else {
        setActive6("");
      }
      if (floorSelect === "5") {
        setActive5("buttonActive");
      } else {
        setActive5("");
      }
      if (floorSelect === "2") {
        setActive2("buttonActive");
      } else {
        setActive2("");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floorSelect]);

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
        availableRooms={availableRooms}
      />
      <ButtonGroup orientation="vertical" className="floorButtons">
        <Button id="7" className={active7} onClick={changeFloor}>
          7
        </Button>
        <Button id="6" className={active6} onClick={changeFloor}>
          6
        </Button>
        <Button id="5" className={active5} onClick={changeFloor}>
          5
        </Button>
        <Button id="2" className={active2} onClick={changeFloor}>
          2
        </Button>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          disableElevation
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon />
        </Button>
      </ButtonGroup>
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
