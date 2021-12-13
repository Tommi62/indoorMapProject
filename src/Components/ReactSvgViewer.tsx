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
  from: string;
  to: string;
  update: number;
}

interface buttonStyles {
  2: string;
  5: string;
  6: string;
  7: string;
}

interface resources {
  code: string;
  id: string;
  name: string;
  type: string;
}

interface nextClassArray {
  startDate: string;
  endDate: string;
  subject: string;
  resources: resources[];
}

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  setMarker: Function;
  setIsVisible: Function;
  setShowNav: Function;
  isVisible: boolean;
  marker: any;
  modalOpen: any;
  floor: keyof typeof data;
  setFloor: Function;
  availableRooms: string[];
  navigateToNextClass: navigateToNextClass;
  nextClassArray: nextClassArray[];
  setNextClassArray: Function;
  start: any;
  end: any;
  toggle: any;
  popupID: any;
  navigateFrom: Function;
  navigateTo: Function;
  showNav: boolean;
  clickLocation: boolean;
  setButtonStyles: Function;
  setClickLocation: Function;
  setPopupID: Function;
  buttonStyles: buttonStyles;
  closePopup: number;
  open: boolean;
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
  nextClassArray,
  setNextClassArray,
  isVisible,
  setIsVisible,
  start,
  end,
  showNav,
  setShowNav,
  navigateFrom,
  navigateTo,
  toggle,
  setButtonStyles,
  buttonStyles,
  clickLocation,
  setClickLocation,
  popupID,
  setPopupID,
  closePopup,
  open,
}: propTypes) => {
  const [map, setMap] = useState<any>();
  const { getModalData } = useModalData();
  const [popupPosition, setPopupPosition] = useState<any>([0, 0]);
  const [svgSize, setSvgSize] = useState("");
  const [boundsReady, setBoundsReady] = useState(false);
  const [realNextClassArray, setRealNextClassArray] = useState<
    nextClassArray[]
  >([]);
  const [emptyNextClassArrays, setEmptyNextClassArrays] = useState(Date.now());
  const [anotherClass, setAnotherClass] = useState({
    roomCode: "",
    update: Date.now(),
  });

  useEffect(() => {
    setIsVisible(false);
    setMarker("");
  }, [modalOpen]);

  useEffect(() => {
    if (map !== undefined) {
      map.closePopup();
      setIsVisible(false);
    }
  }, [toggle, open]);

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

  const getDataAndOpenModal = async () => {
    map.closePopup();
    setIsVisible(false);
    const modalData = await getModalData("KM" + popupID);
    if (modalData !== undefined) {
      if (modalData.length !== 0) {
        setModalContent(modalData);
      }
    }
    setKeyWord("KM" + popupID);
    setModalOpen(true);
  };

  useEffect(() => {
    console.log("popup visible:", isVisible);
  }, [isVisible]);

  const getClickLocation = () => {
    return clickLocation;
  };
  //displays popups on map when clicking on rooms with ids
  const mapClick = (e: any) => {
    setEmptyNextClassArrays(Date.now());
    let str = e.originalEvent.target.id;
    if (isNaN(str.charAt(0)) && str !== "") {
      setIsVisible(true);
      setPopupPosition(e.latlng);
      setPopupID(str);
    } else {
      setIsVisible(false);
    }
    setClickLocation(false);
  };

  useEffect(() => {
    try {
      if (navigateToNextClass.to !== "" && nextClassArray.length > 0) {
        navigateFrom(navigateToNextClass.from);
        navigateTo(navigateToNextClass.to);
        setFloor("2");
        setTimeout(() => {
          setRealNextClassArray(nextClassArray);
        }, 500);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [nextClassArray]);

  useEffect(() => {
    try {
      if (realNextClassArray.length > 0) {
        setIsVisible(true);
        setPopupPosition([67.0111887034459, -111.85380415976664]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [realNextClassArray]);

  useEffect(() => {
    try {
      if (realNextClassArray.length > 0) {
        setNextClassArray([]);
        setRealNextClassArray([]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [emptyNextClassArrays]);

  useEffect(() => {
    try {
      if (anotherClass.roomCode !== "") {
        navigateTo(anotherClass.roomCode);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [anotherClass]);

  useEffect(() => {
    if (map !== undefined) {
      map.off("click touchstart", mapClick);
      map.on("click touchstart", mapClick);
    }
  }, [map]);

  const handlePopupClose = () => {
    hideNavigationButtons();
  };

  useEffect(() => {
    try {
      if (map !== undefined) {
        setIsVisible(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floor, marker, closePopup]);

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
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
  });

  const [bounds, setBounds] = useState<any>();

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
    }),
    []
  );

  return (
    <MapContainer
      center={[0, -60]}
      zoom={1}
      maxZoom={3}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ width: "100vw", height: "calc(100vh)" }}
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
            setButtonStyles={setButtonStyles}
            buttonStyles={buttonStyles}
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
            nextClassArray={realNextClassArray}
            setAnotherClass={setAnotherClass}
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
