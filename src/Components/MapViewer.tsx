import RViewerJS from 'viewerjs-react'
import 'viewerjs-react/dist/index.css'
import Floor7 from '../Media/FloorImages/7._kerros-_reitit_kartalla.svg';
import Routes7 from '../Media/FloorPaths/7._kerros-_reitit.svg';
import Floor7SVG from './Floor7SVG';
import ReactSvgViewer from './ReactSvgViewer';
import React from "react";


const options = {
    backdrop: 'static',
    button: false,
    navbar: false,
    title: false,
    inline: true,
    slideOnTouch: false,
    zIndex: 1,
    zoomRatio: 0.4,
    tooltip: false,
    toggleOnDblclick: false,
}

interface propTypes {
    update: paramObj
}

interface paramObj {
    startNode: string,
    endNode: string
}

const MapViewer = ({update}: propTypes) => {
  return(
  <>
    {/* <RViewerJS options={options} className='map'>
      <img src={Floor7} alt="Floor 7" style={{
          visibility: 'hidden',
          display: 'none'
          }}/>
          <Floor7SVG active={true}/>
    </RViewerJS> */}
    {/* <img src={Routes7} alt="Floor 7 Routes"
    style={{
        position: 'absolute',
        height: 'calc(100vh - 64px)',
        pointerEvents: 'none',
        }}
        className='viewer-move viewer-transition'/> */}
        <ReactSvgViewer update={update}/>
    </>
  );
};

export default MapViewer;