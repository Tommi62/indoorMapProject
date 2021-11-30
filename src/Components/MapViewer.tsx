import ReactSvgViewer from "./ReactSvgViewer";
import MapColorcodeSVG from "./MapColorcodeSVG";
import { Button, ButtonGroup } from "@material-ui/core";
import { useState, useEffect } from "react";

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
  floorSelect: string;
  setFloorSelect: Function;
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
  floorSelect,
  setFloorSelect,
}: propTypes) => {
  const [active7, setActive7] = useState("");
  const [active6, setActive6] = useState("");
  const [active5, setActive5] = useState("");
  const [active2, setActive2] = useState("");

  const changeFloor = (e: any) => {
    setFloorSelect(e.target.innerText);
    setMarker("");
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
      />
      <ButtonGroup orientation="vertical" className="floorButtons">
        <Button className={active7} onClick={changeFloor}>
          7
        </Button>
        <Button className={active6} onClick={changeFloor}>
          6
        </Button>
        <Button className={active5} onClick={changeFloor}>
          5
        </Button>
        <Button className={active2} onClick={changeFloor}>
          2
        </Button>
      </ButtonGroup>
      <MapColorcodeSVG />
    </>
  );
};

export default MapViewer;
