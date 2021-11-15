import React, {useRef, useState, useEffect} from 'react';
import {
  INITIAL_VALUE,
  pan,
  ReactSVGPanZoom,
  TOOL_PAN,
  fitToViewer,
} from 'react-svg-pan-zoom';

import { useWindowSize } from '@react-hook/window-size';
import { RouteFinder } from './RouteFinder';
import {Typography} from '@material-ui/core';

interface paramObj {
  startNode: string,
  endNode: string
}

const ReactSvgViewer = ({update}: {update: paramObj}) => {

  const Viewer = useRef<any>(null);
  const [width, height] = useWindowSize(
      { initialWidth: 400, initialHeight: 400 });
  const [tool, setTool] = useState(TOOL_PAN);
  const [value, setValue] = useState(INITIAL_VALUE);

  const zoomTransition = () => {
    //TODO: make zoom smooth by applying transition class to the svg
    //MUISTA TEHDÄ ONZOOM-TRANSITIO!!!!!! t.Tommi (:D)
  };

  useEffect(() => {
    if (Viewer.current !== null) {
      Viewer.current.fitToViewer('center', 'top');
    }
  }, []);

  return (
      <div>
        <ReactSVGPanZoom
            ref={Viewer}
            width={width} height={(height - 64)}
            background={'white'}
            SVGBackground={'#ffffff00'}
            tool={tool} onChangeTool={setTool}
            value={value} onChangeValue={setValue}
            onClick={event => console.log()}
            detectAutoPan={false}
            //onZoom={zoomTransition()}
            toolbarProps={{SVGAlignX: 'center'}}
            scaleFactorMax={1}
            scaleFactorMin={0.1}
            scaleFactorOnWheel={1.2}
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 912.36 2255.97"
          >
            <RouteFinder update={update}/>
          </svg>
        </ReactSVGPanZoom>
      </div>
  );
};

export default ReactSvgViewer;