import Floor7 from "../Media/FloorImages/7._kerros-_reitit_kartalla.svg";
import Routes7 from "../Media/FloorPaths/7._kerros-_reitit.svg";
import Floor7SVG from "./Floor7SVG";
import ReactSvgViewer from "./ReactSvgViewer";
import React from "react";

const options = {
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
};

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  marker: string;
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
}: propTypes) => {
  return (
    <>
      <ReactSvgViewer
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setKeyWord={setKeyWord}
        update={update}
        marker={marker}
      />
    </>
  );
};

export default MapViewer;
