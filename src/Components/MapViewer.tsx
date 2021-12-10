import ReactSvgViewer from "./ReactSvgViewer";
import MapColorcodeSVG from "./MapColorcodeSVG";
import { Button, ButtonGroup } from "@material-ui/core";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Menu, MenuItem, unstable_composeClasses } from "@mui/material";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import moment from "moment";
import "moment/locale/fi";
import data from "../Data/classrooms.json";
import { useApiData } from "../Hooks/ApiHooks";
import NavDrawer from "./NavDrawer";

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  marker: string;
  setMarker: Function;
  modalOpen: any;
  floorSelect: keyof typeof data;
  setFloorSelect: Function;
  setNoOwnListNotification: Function;
}

interface paramObj {
  startNode: string;
  endNode: string;
}

interface requestObj {
  group: string[];
  room: string[];
  realization: string[];
  startDate: string;
  apiKey: string;
  apiUrl: string;
  rangeStart: string;
  rangeEnd: string;
}

interface resourcesArray {
  code: string,
  id: string,
  name: string,
  type: string,
}

interface classesArray {
  resources: resourcesArray[];
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

interface nextClassArray {
  startDate: string,
  endDate: string,
  subject: string,
  resources: resourcesArray[],
}

const MapViewer = ({
  setModalOpen,
  setModalContent,
  setKeyWord,
  update,
  marker,
  setMarker,
  modalOpen,
  floorSelect,
  setFloorSelect,
  setNoOwnListNotification,
}: propTypes) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { postGetMetropoliaData } = useApiData();
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [nextClassArray, setNextClassArray] = useState<nextClassArray[]>([]);
  const [navigateToNextClass, setNavigateToNextClass] =
    useState<navigateToNextClass>({
      from: "U21",
      to: "",
      update: Date.now(),
    });
  const [isVisible, setIsVisible] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [clickLocation, setClickLocation] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [toggle, setToggle] = useState(Date.now());
  const [popupID, setPopupID] = useState("");
  const [openState, setOpenState] = useState(false);
  const [buttonStyles, setButtonStyles] = useState<buttonStyles>({
    "2": "",
    "5": "",
    "6": "",
    "7": "",
  });
  const [closePopup, setClosePopup] = useState(Date.now());

  useEffect(() => {
    try {
      if (buttonStyles[floorSelect] === "endButton blink") {
        buttonStyles[floorSelect] = "endButton";
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floorSelect]);

  useEffect(() => {
    try {
      console.log(buttonStyles);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [buttonStyles]);

  const navigateTo = (id: string) => {
    setClosePopup(Date.now());
    setShowNav(false);
    setEnd(id);
    setToggle(Date.now());
  };

  const navigateFrom = (id: string) => {
    setClosePopup(Date.now());
    if (floorSelect !== id.charAt(1)) {
      setFloorSelect(id.charAt(1));
    }
    setStart(id);
    setShowNav(false);
    setToggle(Date.now());
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setIsVisible(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [active7, setActive7] = useState("");
  const [active6, setActive6] = useState("");
  const [active5, setActive5] = useState("");
  const [active2, setActive2] = useState("");

  const changeFloor = (e: any) => {
    if (e.target.id !== floorSelect) {
      if (e.target.id === "") {
        setFloorSelect(e.target.innerText);
      } else {
        setFloorSelect(e.target.id);
      }
      setMarker("");
      setAvailableRooms([]);
    }
  };

  const getAvailableRooms = async () => {
    try {
      const dateNow = moment().locale("fi").format("YYYY-MM-DD");
      const timeNow = moment().locale("fi").format("LT").replace(".", ":");
      const now = dateNow + "T" + timeNow;
      let roomArray = [];
      for (let i = 0; i < data[floorSelect].length; i++) {
        if (
          !data[floorSelect][i].name.startsWith("V") &&
          !data[floorSelect][i].name.startsWith("S") &&
          !data[floorSelect][i].name.startsWith("H")
        ) {
          roomArray.push("KM" + data[floorSelect][i].name);
        }
      }
      let requestObject: requestObj = {
        group: [],
        room: roomArray,
        realization: [],
        startDate: "",
        apiKey: "",
        apiUrl: "",
        rangeStart: now,
        rangeEnd: "",
      };
      const reservedRooms = await postGetMetropoliaData(requestObject);
      if (reservedRooms.reservations.length !== 0) {
        for (let i = 0; i < reservedRooms.reservations.length; i++) {
          for (
            let j = 0;
            j < reservedRooms.reservations[i].resources.length;
            j++
          ) {
            if (reservedRooms.reservations[i].resources[j].type === "room") {
              roomArray = roomArray.filter(
                (e) => e !== reservedRooms.reservations[i].resources[j].code
              );
              break;
            }
          }
        }
      }
      console.log("Rooms available", roomArray);
      setAvailableRooms(roomArray);
      handleClose();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const whatsMyNextClass = async () => {
    try {
      if (localStorage.getItem("ownList") !== null) {
        const ownListArray = JSON.parse(localStorage.getItem("ownList")!);
        let realizationArray = [];
        let groupArray = [];
        if (ownListArray.length > 0) {
          for (let i = 0; i < ownListArray.length; i++) {
            if (
              ownListArray[i].startsWith("TX00") ||
              ownListArray[i].startsWith("TU00") ||
              ownListArray[i].startsWith("XX00")
            ) {
              realizationArray.push(ownListArray[i]);
            } else {
              groupArray.push(ownListArray[i]);
            }
          }
          const dateNow = moment().locale("fi").format("YYYY-MM-DD");
          const timeNow = moment().locale("fi").format("LT").replace(".", ":");
          const now = dateNow + "T" + timeNow;
          let requestObject: requestObj = {
            group: [],
            room: [],
            realization: [],
            startDate: "",
            apiKey: "",
            apiUrl: "",
            rangeStart: now,
            rangeEnd: "2121-12-02T11:00",
          };
          let realizations = [];
          let groups = [];
          if (realizationArray.length > 0) {
            requestObject.realization = realizationArray;
            realizations = await postGetMetropoliaData(requestObject);
          }
          if (groupArray.length > 0) {
            requestObject.group = groupArray;
            requestObject.realization = [];
            groups = await postGetMetropoliaData(requestObject);
          }
          let nextClassArray;
          if (
            realizations.reservations !== undefined &&
            groups.reservations !== undefined
          ) {
            nextClassArray = realizations.reservations.concat(
              groups.reservations
            );
          } else if (realizations.reservations !== undefined) {
            nextClassArray = realizations.reservations;
          } else {
            nextClassArray = groups.reservations;
          }
          nextClassArray.sort((a: any, b: any) =>
            a.startDate > b.startDate ? 1 : b.startDate > a.startDate ? -1 : 0
          );
          console.log("NEXTCLASSARRAY", nextClassArray);

          let finalNextClassArray = [];
          let count = -1;
          let alreadyExists = false;
          for (let i = 0; i < nextClassArray.length; i++) {
            alreadyExists = false;
            if (
              i === 0 ||
              nextClassArray[i].startDate ===
              finalNextClassArray[count].startDate ||
              nextClassArray[i].startDate < now
            ) {
              if (i === 0) {
                finalNextClassArray.push(nextClassArray[i]);
                count++;
              } else {
                for (let j = 0; j < finalNextClassArray.length; j++) {
                  if (nextClassArray[i].id === finalNextClassArray[j].id) {
                    alreadyExists = true;
                    break;
                  }
                }
                if (!alreadyExists) {
                  finalNextClassArray.push(nextClassArray[i]);
                  count++;
                }
              }
            } else {
              break;
            }
          }
          console.log("FinalNextClassArray", finalNextClassArray);
          goToMyNextClass(finalNextClassArray);
        } else {
          setModalOpen(true);
          setNoOwnListNotification(true);
        }
      } else {
        setModalOpen(true);
        setNoOwnListNotification(true);
      }
      handleClose();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const goToMyNextClass = (classesArray: nextClassArray[]) => {
    try {
      for (let i = 0; i < classesArray[0].resources.length; i++) {
        if (classesArray[0].resources[i].type === "room") {
          const splittedRoom = classesArray[0].resources[i].code.substr(2);
          const navigateObject = {
            from: "U21",
            to: splittedRoom,
            update: Date.now(),
          };
          setNavigateToNextClass(navigateObject);
          setNextClassArray(classesArray);
          break;
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("styles", buttonStyles);
  }, [buttonStyles]);

  useEffect(() => {
    try {
      if (floorSelect === "7") {
        setActive7("buttonActive");
      } else {
        setActive7("");
      }
      if (floorSelect === "6") {
        setActive6("buttonActive");
      } else {
        setActive6("");
      }
      if (floorSelect === "5") {
        setActive5("buttonActive");
      } else {
        setActive5("");
      }
      if (floorSelect === "2") {
        setActive2("buttonActive");
      } else {
        setActive2("");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floorSelect]);

  return (
    <>
      <ReactSvgViewer
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setKeyWord={setKeyWord}
        update={update}
        marker={marker}
        setMarker={setMarker}
        modalOpen={modalOpen}
        floor={floorSelect}
        setFloor={setFloorSelect}
        availableRooms={availableRooms}
        navigateToNextClass={navigateToNextClass}
        nextClassArray={nextClassArray}
        setNextClassArray={setNextClassArray}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showNav={showNav}
        setShowNav={setShowNav}
        start={start}
        end={end}
        navigateFrom={navigateFrom}
        navigateTo={navigateTo}
        toggle={toggle}
        setButtonStyles={setButtonStyles}
        buttonStyles={buttonStyles}
        clickLocation={clickLocation}
        setClickLocation={setClickLocation}
        popupID={popupID}
        setPopupID={setPopupID}
        closePopup={closePopup}
        open={openState}
      />

      <ButtonGroup orientation="vertical" className="floorButtons">
        <Button
          id="7"
          className={active7 + " " + buttonStyles[7]}
          onClick={changeFloor}
        >
          7
        </Button>
        <Button
          id="6"
          className={active6 + " " + buttonStyles[6]}
          onClick={changeFloor}
        >
          6
        </Button>
        <Button
          id="5"
          className={active5 + " " + buttonStyles[5]}
          onClick={changeFloor}
        >
          5
        </Button>
        <Button
          id="2"
          className={active2 + " " + buttonStyles[2]}
          onClick={changeFloor}
        >
          2
        </Button>

      </ButtonGroup>
      <ButtonGroup orientation="vertical" className="tempButton">
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          disableElevation
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={getAvailableRooms}>Show available rooms</MenuItem>
        <MenuItem onClick={whatsMyNextClass}>Go to my next class</MenuItem>
      </Menu>

      <MapColorcodeSVG />
      <NavDrawer
        navigateFrom={navigateFrom}
        navigateTo={navigateTo}
        setMarker={setMarker}
        setFloor={setFloorSelect}
        setClickLocation={setClickLocation}
        popupID={popupID}
        clickLocation={clickLocation}
        open={openState}
        setOpen={setOpenState}
        end={end}
        start={start}
      ></NavDrawer>
    </>
  );
};

export default MapViewer;
