import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  SVGOverlay,
} from "react-leaflet";
import Floor7SVG from "./Floor7SVG";

interface propTypes {}

const LeafletMap = ({}: propTypes) => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={0}
      scrollWheelZoom={false}
      style={{ width: "100vw", height: "calc(100vh - 64px)" }}
    >
      <SVGOverlay
        bounds={[
          [100, 100],
          [-100, -100],
        ]}
      >
        <Floor7SVG active={true}></Floor7SVG>
      </SVGOverlay>
      <Marker position={[0, 0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
