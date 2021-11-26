import ReactSvgViewer from "./ReactSvgViewer";
import MapColorcodeSVG from "./MapColorcodeSVG";
import { Button, ButtonGroup } from "@material-ui/core";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Menu, MenuItem } from "@mui/material";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";

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

const MapViewer = ({
  setModalOpen,
  setModalContent,
  setKeyWord,
  update,
  marker,
  setMarker,
  modalOpen,
}: propTypes) => {
  const [floorSelect, setFloorSelect] = useState("2");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
        <MenuItem>Show available rooms</MenuItem>
      </Menu>
      <MapColorcodeSVG />
    </>
  );
};

export default MapViewer;
