import React, { useRef, useState, useEffect, useMemo } from "react";
import { MapContainer, Marker, SVGOverlay, Popup } from "react-leaflet";
import { RouteFinder } from "./RouteFinder";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import data from "../Data/classrooms.json";
import * as L from "leaflet";
import { useModalData } from "../Hooks/ModalDataHooks";
import InfoIcon from "@mui/icons-material/Info";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";

interface paramObj {
  startNode: string;
  endNode: string;
}

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  setMarker: Function;
  marker: string;
  modalOpen: any;
  floor: string;
  setFloor: Function;
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
  const [zoom, setZoom] = useState(1);

  const filterJsonData = (data: any) => {
    //removes KM from room name and returns all matching json data
    return data.filter((e: any) => e.name === marker.substring(2));
  };

  useEffect(() => {
    if (filterJsonData(data).length > 0) {
      setFloor(marker.substring(3).charAt(0));
      filterJsonData(data).map((x: any) => {
        map.flyTo([x.lat, x.lng], 2);
        return null;
      });
    }
  }, [marker]);

  useEffect(() => {
    setIsVisible(false);
    setMarker("");
  }, [modalOpen]);

  const svgRef = useRef<any>();
  const markerRef = useRef<any>();

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
    map.closePopup();
    setShowNav(false);
    setEnd(id);
    setTimeout(() => {
      map.closePopup();
    }, 1);
  };

  const navigateFrom = (id: string) => {
    map.closePopup();
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
    let str = e.originalEvent.path[0].id.slice(0, -1);
    console.log(e.latlng);
    if (isNaN(str.charAt(0)) && str !== "") {
      setIsVisible(true);
      setPopupPosition(e.latlng);
      setPopupID(str);
    }
  };

  useEffect(() => {
    if (map !== undefined) {
      //map.getPane("overlayPane").firstChild.style.width = "3000px";
      map.on("click", mapClick);
      map.on("zoom", () => {});
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

  return (
    <MapContainer
      center={[0, -60]}
      zoom={1}
      maxZoom={3}
      zoomSnap={0.05}
      scrollWheelZoom={false}
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
          />
        </svg>
      </SVGOverlay>
      {isVisible && (
        <Popup position={popupPosition} onClose={handlePopupClose}>
          <>
            <Typography>{popupID}</Typography>
            {!showNav ? (
              <ButtonGroup>
                <Button onClick={getDataAndOpenModal}>
                  <InfoIcon />
                </Button>
                <Button onClick={showNavigationButtons}>
                  <AssistantDirectionIcon></AssistantDirectionIcon>
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button onClick={navigateFrom.bind(popupID, popupID)}>
                  Navigate from
                </Button>
                <Button onClick={navigateTo.bind(popupID, popupID)}>
                  Navigate to
                </Button>
              </ButtonGroup>
            )}
          </>
        </Popup>
      )}

      {filterJsonData(data).length > 0 ? (
        filterJsonData(data).map((x: any) => {
          return (
            <Marker
              position={[x.lat, x.lng]}
              eventHandlers={eventHandlers}
              ref={markerRef}
            ></Marker>
          );
        })
      ) : (
        <></>
      )}
    </MapContainer>
  );
};

export default ReactSvgViewer;
