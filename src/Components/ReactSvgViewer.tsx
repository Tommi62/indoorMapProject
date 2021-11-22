import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  INITIAL_VALUE,
  pan,
  ReactSVGPanZoom,
  TOOL_PAN,
  fitToViewer,
} from "react-svg-pan-zoom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  SVGOverlay,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useWindowSize } from "@react-hook/window-size";
import { RouteFinder } from "./RouteFinder";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import data from "./Data/classrooms.json";
import * as L from "leaflet";
import { useModalData } from "../Hooks/ModalDataHooks";
import InfoIcon from "@mui/icons-material/Info";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import { renderToString } from "react-dom/server";
import { useMediaQuery } from "@mui/material";

interface paramObj {
  startNode: string;
  endNode: string;
}

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  marker: string;
}

const ReactSvgViewer = ({
  setModalOpen,
  setModalContent,
  setKeyWord,
  update,
  marker,
}: propTypes) => {
  const [map, setMap] = useState<any>();
  const { getModalData } = useModalData();
  const [showNav, setShowNav] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    console.log("DATA: " + data[0].name);
  }, []);

  const filterJsonData = (data: any) => {
    //removes KM from room name and returns all matching json data
    return data.filter((e: any) => e.name === marker.substring(2));
  };

  useEffect(() => {
    if (filterJsonData(data).length > 0) {
      filterJsonData(data).map((x: any) => {
        map.flyTo([x.lat, x.lng], 2);
        return null;
      });
    }
  }, [marker]);

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
    setTimeout(function () {
      setShowNav(false);
    }, 100);
  };
  const navigateTo = (id: string) => {
    setEnd(id);
  };

  const navigateFrom = (id: string) => {
    setStart(id);
  };

  const buttonGroup = (id: string) => {
    const getDataAndOpenModal = async () => {
      const modalData = await getModalData("KM" + id);
      if (modalData !== undefined) {
        if (modalData.length !== 0) {
          setModalContent(modalData);
        }
      }
      setKeyWord("KM" + id);
      setModalOpen(true);
    };
    return (
      <>
        <Typography>{id}</Typography>
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
            <Button onClick={navigateFrom.bind(id, id)}>Navigate from</Button>
            <Button onClick={navigateTo.bind(id, id)}>Navigate to</Button>
          </ButtonGroup>
        )}
      </>
    );
  };

  const mapClick = (e: any) => {
    console.log(e.originalEvent.path[0].id, e.latlng);
    let str = e.originalEvent.path[0].id.slice(0, -1);
    if (isNaN(str.charAt(0)) && str !== "") {
      const popup = L.popup()
          .setLatLng(e.latlng)
          .setContent("buttonGroup(str)")
          .openOn(map);
    }
  };

  useEffect(() => {
    if (map !== undefined) {
      map.on("click", mapClick);
    }
  });

  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      scrollWheelZoom={false}
      style={{ width: "100vw", height: "calc(100vh - 64px)" }}
      whenCreated={(mapInstance) => {
        setMap(mapInstance);
      }}
    >
      <SVGOverlay
        bounds={[
          [100, 100],
          [-100, -100],
        ]}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 912.36 2255.97">
          <RouteFinder
            setModalOpen={setModalOpen}
            setModalContent={setModalContent}
            setKeyWord={setKeyWord}
            update={update}
            marker={marker}
          />
        </svg>
      </SVGOverlay>
      {filterJsonData(data).length > 0 ? (
        filterJsonData(data).map((x: any) => {
          return (
            <Marker
              position={[x.lat, x.lng]}
              eventHandlers={eventHandlers}
              ref={markerRef}
            >
              <Popup>{x.name}</Popup>
            </Marker>
          );
        })
      ) : (
        <></>
      )}
    </MapContainer>
  );
};

export default ReactSvgViewer;
