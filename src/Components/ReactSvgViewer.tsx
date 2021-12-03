import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  SVGOverlay,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { RouteFinder } from "./RouteFinder";
import data from "../Data/classrooms.json";
import classMarker from "../Markers/classMarker.svg";
import stairsMarker from "../Markers/stairsMarker.svg";
import elevatorMarker from "../Markers/elevatorMarker.svg";
import wcMarker from "../Markers/wcMarker.svg";

import * as L from "leaflet";
import { useModalData } from "../Hooks/ModalDataHooks";
import LeafletPopup from "./LeafletPopup";

interface paramObj {
  startNode: string;
  endNode: string;
}

interface dataArray {
  name: string;
  lat: number;
  lng: number;
}

interface navigateToNextClass {
  from: string,
  to: string,
  update: number,
}

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  setMarker: Function;
  marker: any;
  modalOpen: any;
  floor: keyof typeof data;
  setFloor: Function;
  availableRooms: string[];
  navigateToNextClass: navigateToNextClass,
}

const ReactSvgViewer = ({
  setModalOpen,
  setModalContent,
  setKeyWord,
  update,
  marker,
  setMarker,
  modalOpen,
  floor,
  setFloor,
  availableRooms,
  navigateToNextClass,
}: propTypes) => {
  const [map, setMap] = useState<any>();
  const { getModalData } = useModalData();
  const [showNav, setShowNav] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [popupPosition, setPopupPosition] = useState<any>([0, 0]);
  const [popupID, setPopupID] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [svgSize, setSvgSize] = useState("");
  const [boundsReady, setBoundsReady] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setMarker("");
  }, [modalOpen]);

  const svgRef = useRef<any>();
  const markerRef = useRef<any>();
  const [markerBoundsElement, setMarkerBoundsElement] = useState<any>();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );

  const showNavigationButtons = () => {
    setShowNav(true);
  };
  const hideNavigationButtons = () => {
    setShowNav(false);
  };
  const navigateTo = (id: string) => {
    setShowNav(false);
    setEnd(id);
    setTimeout(() => {
      map.closePopup();
    }, 1);
  };

  const navigateFrom = (id: string) => {
    setStart(id);
    setShowNav(false);
    setTimeout(() => {
      map.closePopup();
    }, 1);
  };

  const getDataAndOpenModal = async () => {
    map.closePopup();
    const modalData = await getModalData("KM" + popupID);
    if (modalData !== undefined) {
      if (modalData.length !== 0) {
        setModalContent(modalData);
      }
    }
    setKeyWord("KM" + popupID);
    setModalOpen(true);
  };

  const mapClick = (e: any) => {
    let str = e.originalEvent.target.id;
    console.log("event", e.latlng);
    if (isNaN(str.charAt(0)) && str !== "") {
      setIsVisible(true);
      setPopupPosition(e.latlng);
      setPopupID(str);
    }
  };

  useEffect(() => {
    try {
      if (navigateToNextClass.to !== '') {
        navigateFrom(navigateToNextClass.from);
        navigateTo(navigateToNextClass.to);
        setFloor('2');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [navigateToNextClass]);

  useEffect(() => {
    if (map !== undefined) {
      map.on("click touchstart", mapClick);
    }
  }, [map]);

  const handlePopupClose = () => {
    hideNavigationButtons();
  };

  useEffect(() => {
    try {
      if (map !== undefined) {
        setTimeout(() => {
          map.closePopup();
        }, 1);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floor, marker]);

  useEffect(() => {
    try {
      console.log(marker);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [marker]);

  useEffect(() => {
    try {
      if (floor === "2") {
        setSvgSize("1000 0 1050 2255.97");
      }
      if (floor === "5") {
        setSvgSize("1000 0 1050 2255.97");
      }
      if (floor === "6") {
        setSvgSize("1000 0 1050 2255.97");
      }
      if (floor === "7") {
        setSvgSize("0 0 912.36 2255.97");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floor]);

  const [markerIcon, setMarkerIcon] = useState(classMarker);

  useEffect(() => {
    try {
      if (marker[0].name.charAt(0) === "V") {
        setMarkerIcon(wcMarker);
      } else if (marker[0].name.charAt(0) === "H") {
        setMarkerIcon(elevatorMarker);
      } else if (marker[0].name.charAt(0) === "S") {
        setMarkerIcon(stairsMarker);
      } else {
        setMarkerIcon(classMarker);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [marker]);

  let classIcon = L.icon({
    iconUrl: markerIcon,
    /*toilet https://cdn-icons.flaticon.com/png/512/2274/premium/2274172.png?token=exp=1637933882~hmac=b648cf3c448c8f637db40d26f39eb3c7 */
    /*stairs https://cdn-icons-png.flaticon.com/512/734/734548.png */
    /*elevator https://cdn-icons.flaticon.com/png/512/2460/premium/2460777.png?token=exp=1637933983~hmac=f68906f7ad55a15740a0de2b9dfb8c8f */
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
  });

  const [bounds, setBounds] = useState<any>();

  useEffect(() => {
    console.log("eventti map", map);
  }, [map]);

  useEffect(() => {
    if (bounds !== undefined) {
      map.flyToBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    try {
      if (boundsReady) {
        const xlat = markerBoundsElement.getBounds()._northEast.lat;
        const xlng = markerBoundsElement.getBounds()._northEast.lng;
        const ylat = markerBoundsElement.getBounds()._southWest.lat;
        const ylng = markerBoundsElement.getBounds()._southWest.lng;
        console.log("useEffect eventti", xlat, xlng, ylat, ylng);
        setBounds([
          [xlat, xlng],
          [ylat, ylng],
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [marker, boundsReady]);

  const markerGroupEventHandlers = useMemo(
    () => ({
      layeradd(e: any) {
        try {
          setMarkerBoundsElement(e.target);
          setBoundsReady(true);
        } catch (e) {
          console.log(e);
        }
      },
      /* layerremove(e: any) {
        try {
          const xlat = e.target.getBounds()._northEast.lat;
          const xlng = e.target.getBounds()._northEast.lng;
          const ylat = e.target.getBounds()._southWest.lat;
          const ylng = e.target.getBounds()._southWest.lng;
          console.log("remove eventti", xlat, xlng, ylat, ylng);
          setBounds([
            [xlat, xlng],
            [ylat, ylng],
          ]);
        } catch (e) {
          console.log(e);
        }
      }, */
    }),
    []
  );

  return (
    <MapContainer
      center={[0, -60]}
      zoom={1}
      maxZoom={3}
      scrollWheelZoom={true}
      style={{ width: "100vw", height: "calc(100vh - 64px)" }}
      whenCreated={(mapInstance) => {
        setMap(mapInstance);
      }}
    >
      <SVGOverlay
        bounds={[
          [2100, 2100],
          [-2100, -2100],
        ]}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={svgSize} ref={svgRef}>
          <RouteFinder
            setModalOpen={setModalOpen}
            setModalContent={setModalContent}
            setKeyWord={setKeyWord}
            update={update}
            marker={marker}
            start={start}
            end={end}
            floor={floor}
            availableRooms={availableRooms}
          />
        </svg>
      </SVGOverlay>
      {isVisible && (
        <>
          <LeafletPopup
            navigateFrom={navigateFrom}
            navigateTo={navigateTo}
            popupPosition={popupPosition}
            handlePopupClose={handlePopupClose}
            popupID={popupID}
            showNav={showNav}
            getDataAndOpenModal={getDataAndOpenModal}
            showNavigationButtons={showNavigationButtons}
          ></LeafletPopup>
        </>
      )}
      <FeatureGroup eventHandlers={markerGroupEventHandlers}>
        {typeof marker === "string" ? (
          <></>
        ) : (
          marker.map((x: any) => {
            return (
              <Marker
                icon={classIcon}
                position={[x.lat, x.lng]}
                eventHandlers={eventHandlers}
                ref={markerRef}
              ></Marker>
            );
          })
        )}
      </FeatureGroup>
    </MapContainer>
  );
};

export default ReactSvgViewer;
