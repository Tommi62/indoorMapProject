import {useRef, useState, useEffect} from 'react';
import { INITIAL_VALUE, pan, ReactSVGPanZoom, TOOL_PAN, fitToViewer, changeTool } from 'react-svg-pan-zoom';

import {useWindowSize} from '@react-hook/window-size';


const ReactSvgViewer = () => {
  const Viewer = useRef(null);
  const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})
  const [tool, setTool] = useState(TOOL_PAN)
  const [value, setValue] = useState(INITIAL_VALUE)

  const zoomTransition = () => {
    //TODO: make zoom smooth by applying transition class to the svg
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
        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
        detectAutoPan={false}
        onZoom={zoomTransition()}
        toolbarProps={{SVGAlignX: 'center'}}
        scaleFactorMax={1}
        scaleFactorMin={0.1}
        scaleFactorOnWheel={1.2}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 912.36 2255.97"
        >
          <defs>
            <style>
              {
                ".prefix__cls-1,.prefix__cls-2{fill:#b1b1b1}.prefix__cls-2,.prefix__cls-3,.prefix__cls-4,.prefix__cls-5,.prefix__cls-6{stroke:#7f7f7f;stroke-width:3px}.prefix__cls-2,.prefix__cls-3,.prefix__cls-4,.prefix__cls-5,.prefix__cls-6,.prefix__cls-9{stroke-linecap:round;stroke-linejoin:round}.prefix__cls-3,.prefix__cls-9{fill:none}.prefix__cls-4{fill:#00aeef}.prefix__cls-5{fill:#ffc60b}.prefix__cls-6,.prefix__cls-7{fill:#ec008c}.prefix__cls-8{fill:#fff;stroke:#f55;stroke-miterlimit:10;stroke-width:4px}.prefix__cls-9{stroke:#ee2d2b;stroke-width:8px}"
              }
            </style>
          </defs>
          <g id="prefix__Layer_3" data-name="Layer 3">
            <g id="prefix__etc">
              <path
                className="prefix__cls-1"
                d="M70.07 616.27h173.28v20.57H70.33l-.26-20.57zM232 210.97h91.42l96.75-96.74V1.5H232.53L232 210.97z"
              />
              <path
                className="prefix__cls-2"
                d="M1560.7 473.64v234.19l118.68-118.68-11.2-11.21 48.82-48.79-105.79-105.75s-50.51 50.34-50.51 50.24z"
                transform="translate(-1272.26 -134.29)"
              />
              <path
                className="prefix__cls-2"
                d="M531.02 481.37l-144.5 144.49-45.59-45.59-34.22 34.22v87.49l52.85 52.85L581.98 532.4l-51-51"
              />
              <path
                className="prefix__cls-3"
                d="M582.25 532.14L359.46 754.93l-52.95-52.95v-87.69l178.68-178.68"
              />
              <path
                className="prefix__cls-2"
                d="M327.48 1021.57l-46.58 46.58h92.67l-46.09-46.58z"
              />
              <path
                className="prefix__cls-2"
                d="M1553.15 1437.13l44.95 44.95 45.05-45z"
                transform="translate(-1272.26 -134.29)"
              />
              <path
                className="prefix__cls-1"
                d="M73.37 1259.26v73.05h123.29v-20.96h-25.84l-52.35-52.36-45.1.27"
              />
              <path className="prefix__cls-2" d="M73.1 1986.12v83.2h99.7v-83.2" />
              <path
                className="prefix__cls-1"
                d="M1778.35 2048.74l-213-213-48 48v166.82h165.49l46.82 46.81s48.2-49.13 48.69-48.63z"
                transform="translate(-1272.26 -134.29)"
              />
              <path
                className="prefix__cls-2"
                d="M288.02 2254.07v-56.17l37.79-37.8 89.23 89.22-5.14 5.15-121.88-.4z"
              />
            </g>
            <g id="prefix__classes">
              <path
                className="prefix__cls-4"
                d="M419.79 114.91l-96.27 96.26h-91.78v69.23l12.46 12.46-6.66 6.66v39.73h50.92l50.45-50.45 171.6 171.6 121.52-121.52-211.98-211.97-.26-12z"
              />
              <path
                className="prefix__cls-4"
                d="M237.54 299.52v316.95H70.14l.19-336.07h161.41L244 292.67l-6.62 6.62"
              />
              <path
                className="prefix__cls-4"
                d="M1985.58 2086.12l197.54-197.54s-492.39-496.35-494.37-494.37l-170.31 170.31v157.84l244.29 244.29 51.69-51.69 49.18 49.18 122 122-122-122-158.6 158.64h-38V2161l-101.14 101.14 32.22 32.23 89.56 89.55 297.95-297.82"
                transform="translate(-1272.26 -134.29)"
              />
              <path
                className="prefix__cls-4"
                d="M416.19 1257.64l-45.19 45.2h-90.1v-234.69h92.67l42.64 42.64-.02 146.85zM333.2 853.16l73.8-73.51 170.17 170.18-160.62 160.61-109.25-109.25V878.95l13.28-13.23"
              />
              <path
                className="prefix__cls-4"
                transform="rotate(-45 1060.841 2372.885)"
                d="M1725.09 783.96h267.99v240.64h-267.99z"
              />
              <path
                className="prefix__cls-4"
                d="M618.12 568.27l-21.76 21.76 170.29 170.29 143.4-143.41-278.02-278.03-121.65 121.65 107.74 107.74zM196.4 1869.54v116.58H73.1v-116.58M196.4 1754.82v114.72H73.5v-114.72M72.97 1332.58H196.4v422.24H73.5l-.53-422.24z"
              />
            </g>
            <g id="prefix__toilets">
              <path
                className="prefix__cls-5"
                d="M340.93 580.27l45.59 45.59 144.5-144.49-45.75-45.74-144.34 144.64zM244.2 1916.42h167.41l46.25 46.26-25.48 25.48H244.1l.1-71.74z"
              />
            </g>
            <g id="prefix__stairs_elevator" data-name="stairs &amp; elevator">
              <path
                className="prefix__cls-6"
                d="M69.94 636.84v-31.78H1.5v147.3h242.11V636.84H69.94v-20.57M178.73 829.37h66.2v168.79h-66.99l.79-168.79z"
              />
              <path
                className="prefix__cls-7"
                d="M73.1 2069.32h99.69v184.95H73.1z"
              />
            </g>
            <g id="prefix__walls">
              <path
                className="prefix__cls-3"
                d="M416.49 1110.38v149.54l494.31 494.3-500.05 500.05H73.1V752.36H1.5V605.19h68.83V280.4h161.81V1.5h187.91v125.41L910.2 617.06 577.17 949.83l-160.68 160.55z"
              />
              <path
                className="prefix__cls-3"
                d="M485.19 435.61l25.06 25.06 121.78-121.79-211.98-211.97V1.5H232.14v278.9l12.26 12.27-6.86 6.85v39.83h50.9l50.51-50.51 146.24 146.77zM70.33 605.19l-.26 11.08h167.47V339.35M325.85 1347.79l-81.05 81.05v159.23l82.68 82.68 249.82-249.82M327.48 1670.75l162.29 162.3 52.39-52.39 197.54-197.53M506.69 1914.84l-214.02-214.02-48.57 48.56v238.84h150.63M458.42 1963.04l-213.99-213.99M262.01 2028.58h130.74M262.2 2110.27l24.23 24.23 6.89-6.89M173.19 2254.34v-268.22h23.74v-674.91h-26.11l-52.35-52.35H73.24M243.61 667.2v85.16H73.1M243.61 665.32v1.88M243.61 644.95v.4M243.61 643.96v.99M237.54 615.48h6.07v28.48"
              />
            </g>
            <g id="prefix__doors">
              <path
                className="prefix__cls-8"
                d="M320.58 865.72l12.62-12.56M421.81 764.87l12.62-12.57M607.55 557.69l-12.57-12.62M479.65 429.84l-12.57-12.61M274.64 339.31l-17.81-.03M237.53 391.44l.03-17.81M237.51 576.56l.04-17.81M243.58 662.74l.03-17.81M215.74 752.36l-17.81-.04M178.03 988.19l.52-130.92M316.69 1658.96l-12.57-12.62M196.71 1383.3l.04-17.81M280.88 1288.06l.03-17.81M280.98 1095.7l.03-17.81M196.71 1723.52l.04-17.81M173.31 2097.42l.03-17.81M316.95 2151.14l-12.57-12.61M562.29 1800.79l-12.57-12.62M353.54 1695.8l-12.57-12.61M512.18 1908.96l12.62-12.57"
              />
            </g>
          </g>
          <g id="prefix__Layer_2" data-name="Layer 2">
            <path
              className="prefix__cls-9"
              d="M236.49 567.21h26.9M265.62 385.24v181.84M237.28 382.47h26.11M265.63 340.14v42.33M401.39 495.28L264.77 631.9M473.85 422.82l-72.46 72.46M264.97 569.59v85.05M262.6 653.85h-19.39M264.97 657.41v38.77M264.97 695.79l94.75 94.74M600.84 552.18L413.92 739.1M427.96 757.9l-13.05-13.06M360.31 791.92l49.65-49.65M310.01 842.09l17.27 17.28M358.34 793.63l-47.28 47.28M264.45 698.03v85.98M263.92 788.75h92.83M263.92 791.39v87.56M306.64 844.66l-43.25 43.26M207.21 789.81h54.6M156.31 789.81h50.9M155.79 791.92v119.21M176.36 910.6h-17.41M263.92 883.17v205.71M281.32 1086.77h-16.87M263.92 1277.72v-186.73M281.85 1278.78l-17.93.52v-1.58"
            />
            <path
              id="prefix__hissiviiva"
              className="prefix__cls-9"
              d="M155.79 914.29v168.26"
            />
            <path
              className="prefix__cls-9"
              d="M259.7 1086.77H155.26M262.86 1281.41l-42.46 42.46M219.61 1326.77v47.48M196.93 1374.25h20.57M219.08 1376.36v227.34M218.55 1600.01l74.11 74.11M309.81 1652.75l-18.73 18.73M218.55 1605.81v107.07M196.93 1713.94h20.04M293.46 1677.02l-74.38 74.37M218.03 1716.05v33.23M295.57 1678.07l31.91 31.91M346.73 1690.2l-17.67 17.67M329.32 1711.83l152.71 152.7M483.87 1866.91l70.95-70.95M485.98 1868.49l33.76 33.76M218.03 1754.03v253.18M220.66 2006.69h105.5M216.97 2009.32v79.13l-2.63-.53h-41.15M216.97 2091.08v68.05M220.14 2158.6h76.48l2.11-1.58 13.45-13.45M206.95 749.19v39.04M308.09 840.97l-41.54-49.05"
            />
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  )
}

export default ReactSvgViewer;