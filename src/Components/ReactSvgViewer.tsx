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
import * as L from "leaflet";
import { useModalData } from "../Hooks/ModalDataHooks";
import LeafletPopup from "./LeafletPopup";

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
  marker: any;
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
  const [boundsReady, setBoundsReady] = useState(false);

  const filterJsonData = (data: any) => {
    //removes KM from room name and returns all matching json data

    return data.filter((e: any) => e.name === marker.substring(2));
  };

  useEffect(() => {
    console.log("Marker is ", marker);
    if (marker.length > 0) {
      marker.map((x: any) => {
        //map.flyTo([x.lat, x.lng], 2);
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
    let str = e.originalEvent.path[0].id;
    console.log(e.originalEvent.path[0].id);
    console.log(e.latlng);
    if (isNaN(str.charAt(0)) && str !== "") {
      setIsVisible(true);
      setPopupPosition(e.latlng);
      setPopupID(str);
    }
  };

  useEffect(() => {
    if (map !== undefined) {
      map.on("click", mapClick);
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

  let classIcon = L.icon({
    iconUrl:
      "https://cdn-icons.flaticon.com/png/512/2280/premium/2280294.png?token=exp=1637933811~hmac=2c7a85da4b51ec71f2aa10251621ba56",
    /*toilet https://cdn-icons.flaticon.com/png/512/2274/premium/2274172.png?token=exp=1637933882~hmac=b648cf3c448c8f637db40d26f39eb3c7 */
    /*stairs https://cdn-icons-png.flaticon.com/512/734/734548.png */
    /*elevator https://cdn-icons.flaticon.com/png/512/2460/premium/2460777.png?token=exp=1637933983~hmac=f68906f7ad55a15740a0de2b9dfb8c8f */
    iconSize: [20, 20], // size of the icon
    iconAnchor: [11, 11], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
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
  }, [marker, boundsReady]);

  const markerGroupEventHandlers = useMemo(
    () => ({
      layeradd(e: any) {
        try {
          setMarkerBoundsElement(e.target);
          setBoundsReady(true);
          const xlat = e.target.getBounds()._northEast.lat;
          const xlng = e.target.getBounds()._northEast.lng;
          const ylat = e.target.getBounds()._southWest.lat;
          const ylng = e.target.getBounds()._southWest.lng;
          console.log("add eventti", xlat, xlng, ylat, ylng);
          setBounds([
            [xlat, xlng],
            [ylat, ylng],
          ]);
        } catch (e) {
          console.log(e);
        }
      },
      layerremove(e: any) {
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
      },
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
