import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";

function MapColorcodeSVG() {
  const [animate, setAnimate] = useState(true);

  const toggleAnimate = () => {
    if (animate === true) {
      setAnimate(false);
    } else {
      setAnimate(true);
    }
  };

  return animate ? (
    <div className="colorCode slideLeft">
      <svg
        id="prefix__Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 247.86 174"
        className="colorCodeSVG"
      >
        <defs>
          <style>
            {
              ".prefix__cls-4{opacity:.8;font-size:25px;font-family:ProductSans-Regular,Product Sans}.prefix__cls-5{letter-spacing:-.01em}.prefix__cls-7{letter-spacing:-.07em}"
            }
          </style>
        </defs>
        <path fill="#00aeef" d="M0 0h33v33H0z" />
        <path fill="#ec008c" d="M0 71h33v33H0z" />
        <path fill="#ffc60b" d="M0 141h33v33H0z" />
        <text className="prefix__cls-4" transform="translate(46.12 25.85)">
          {"CLASSR"}
          <tspan className="prefix__cls-5" x={89.47} y={0}>
            {"O"}
          </tspan>
          <tspan x={109.47} y={0}>
            {"OM"}
          </tspan>
        </text>
        <text className="prefix__cls-4" transform="translate(44.74 96.59)">
          <tspan letterSpacing="-.01em">{"S"}</tspan>
          <tspan className="prefix__cls-7" x={13.58} y={0}>
            {"T"}
          </tspan>
          <tspan x={25.45} y={0} letterSpacing={0}>
            {"AIR"}
          </tspan>
          <tspan x={62.5} y={0} letterSpacing="-.01em">
            {"S"}
          </tspan>
          <tspan x={76.07} y={0} letterSpacing={0}>
            {"/ELE"}
          </tspan>
          <tspan x={126.55} y={0} letterSpacing="-.07em">
            {"V"}
          </tspan>
          <tspan className="prefix__cls-7" x={140.6} y={0}>
            {"A"}
          </tspan>
          <tspan x={155.67} y={0} letterSpacing="-.03em">
            {"T"}
          </tspan>
          <tspan x={168.42} y={0}>
            {"OR"}
          </tspan>
        </text>
        <text className="prefix__cls-4" transform="translate(45.34 167.26)">
          <tspan className="prefix__cls-5">{"W"}</tspan>
          <tspan x={22.8} y={0}>
            {"C"}
          </tspan>
        </text>
      </svg>
      <Button onClick={toggleAnimate}>
        <ArrowBackIosIcon className="colorcodeArrow rotate0" />
      </Button>
    </div>
  ) : (
    <div className="colorCode slideRight">
      <svg
        id="prefix__Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 247.86 174"
        className="colorCodeSVG"
      >
        <defs>
          <style>
            {
              ".prefix__cls-4{opacity:.8;font-size:25px;font-family:ProductSans-Regular,Product Sans}.prefix__cls-5{letter-spacing:-.01em}.prefix__cls-7{letter-spacing:-.07em}"
            }
          </style>
        </defs>
        <path fill="#00aeef" d="M0 0h33v33H0z" />
        <path fill="#ec008c" d="M0 71h33v33H0z" />
        <path fill="#ffc60b" d="M0 141h33v33H0z" />
        <text className="prefix__cls-4" transform="translate(46.12 25.85)">
          {"CLASSR"}
          <tspan className="prefix__cls-5" x={89.47} y={0}>
            {"O"}
          </tspan>
          <tspan x={109.47} y={0}>
            {"OM"}
          </tspan>
        </text>
        <text className="prefix__cls-4" transform="translate(44.74 96.59)">
          <tspan letterSpacing="-.01em">{"S"}</tspan>
          <tspan className="prefix__cls-7" x={13.58} y={0}>
            {"T"}
          </tspan>
          <tspan x={25.45} y={0} letterSpacing={0}>
            {"AIR"}
          </tspan>
          <tspan x={62.5} y={0} letterSpacing="-.01em">
            {"S"}
          </tspan>
          <tspan x={76.07} y={0} letterSpacing={0}>
            {"/ELE"}
          </tspan>
          <tspan x={126.55} y={0} letterSpacing="-.07em">
            {"V"}
          </tspan>
          <tspan className="prefix__cls-7" x={140.6} y={0}>
            {"A"}
          </tspan>
          <tspan x={155.67} y={0} letterSpacing="-.03em">
            {"T"}
          </tspan>
          <tspan x={168.42} y={0}>
            {"OR"}
          </tspan>
        </text>
        <text className="prefix__cls-4" transform="translate(45.34 167.26)">
          <tspan className="prefix__cls-5">{"W"}</tspan>
          <tspan x={22.8} y={0}>
            {"C"}
          </tspan>
        </text>
      </svg>
      <Button onClick={toggleAnimate}>
        <ArrowBackIosIcon className="colorcodeArrow rotate180" />
      </Button>
    </div>
  );
}

export default MapColorcodeSVG;
