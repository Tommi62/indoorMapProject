import ReactSvgViewer from "./ReactSvgViewer";
import MapColorcodeSVG from "./MapColorcodeSVG";
import { Button, ButtonGroup } from "@material-ui/core";
import { useState } from "react";

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
      <MapColorcodeSVG />
    </>
  );
};

export default MapViewer;
