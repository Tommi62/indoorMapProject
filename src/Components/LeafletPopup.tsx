import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import { Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fi";

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

interface parsedArray {
  subject: string;
  time: string;
  room: string;
  roomCode: string;
}

interface propTypes {
  popupPosition: any;
  handlePopupClose: any;
  popupID: string;
  showNav: boolean;
  getDataAndOpenModal: any;
  showNavigationButtons: any;
  navigateFrom: any;
  navigateTo: any;
  nextClassArray: nextClassArray[];
  setAnotherClass: Function;
}

function LeafletPopup({
  popupPosition,
  handlePopupClose,
  popupID,
  showNav,
  getDataAndOpenModal,
  showNavigationButtons,
  navigateFrom,
  navigateTo,
  nextClassArray,
  setAnotherClass,
}: propTypes) {
  const [parsedArray, setParsedArray] = useState<parsedArray[]>([]);
  const [anotherClassesArray, setAnotherClassesArray] = useState<parsedArray[]>(
    []
  );

  useEffect(() => {
    try {
      if (nextClassArray.length > 0) {
        let array = [];
        for (let i = 0; i < nextClassArray.length; i++) {
          const now = moment().format("YYYY-MM-DD");
          const now2 = moment().locale("fi").format("LT");
          const timeNow = now + "T" + now2;
          let fullTime = "";
          if (nextClassArray[i].startDate < timeNow) {
            fullTime = "Now";
          } else {
            const time = moment(nextClassArray[i].startDate).format(
              "DD.MM.YYYY"
            );
            const time2 = moment(nextClassArray[i].startDate)
              .locale("fi")
              .format("LT");
            fullTime = time + " " + time2;
          }
          let room = "";
          for (let j = 0; j < nextClassArray[i].resources.length; j++) {
            if (nextClassArray[i].resources[j].type === "room") {
              room = nextClassArray[i].resources[j].code;
            }
          }
          let roomCode = room.substr(2);
          const arrayObject = {
            subject: nextClassArray[i].subject,
            time: fullTime,
            room: room,
            roomCode: roomCode,
          };
          array.push(arrayObject);
        }
        setParsedArray(array);

        if (array.length > 1) {
          let array2 = [...array];
          array2.shift();
          setAnotherClassesArray(array2);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [nextClassArray]);

  const goToAnotherClass = (roomCode: string) => {
    const anotherClassObject = {
      roomCode: roomCode,
      update: Date.now(),
    };
    setAnotherClass(anotherClassObject);
  };

  return (
    <Popup
      position={popupPosition}
      onClose={handlePopupClose}
      className="popup"
    >
      {nextClassArray.length > 0 ? (
        <>
          {parsedArray.length > 0 && (
            <Grid container direction="column" className="popupGrid">
              <Grid item>
                <Typography
                  variant="body1"
                  component="div"
                  className="popupText"
                >
                  <b>Next class:</b> {parsedArray[0].subject} <br></br>
                  <b>Time:</b> {parsedArray[0].time} <br></br>
                  <b>Room:</b> {parsedArray[0].room}
                </Typography>
              </Grid>
              {anotherClassesArray.length > 0 && (
                <>
                  <Grid item>
                    <Typography
                      variant="body1"
                      component="div"
                      className="popupText"
                    >
                      <br></br>You also have other classes at the same time:
                    </Typography>
                  </Grid>
                  {anotherClassesArray.map((item) => (
                    <Grid container item direction="row">
                      <Typography
                        variant="body1"
                        component="div"
                        className="popupText"
                      >
                        <br></br>
                        <b>Subject:</b> {item.subject}
                        <br></br>
                        <b>Room:</b> {item.room}
                        <br></br>
                      </Typography>
                      <Button
                        variant="outlined"
                        className="popupButton"
                        onClick={() => goToAnotherClass(item.roomCode)}
                      >
                        Go to this class
                      </Button>
                    </Grid>
                  ))}{" "}
                </>
              )}
            </Grid>
          )}
        </>
      ) : (
        <>
          {(popupID.charAt(0) === "D" ||
            popupID.charAt(0) === "E" ||
            popupID.charAt(0) === "C") && (
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
            )}
          {(popupID.charAt(0) === "V" || popupID.charAt(0) === "K") && (
            <>
              <Typography>{"WC"}</Typography>
              {!showNav ? (
                <ButtonGroup>
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
          )}
          {popupID === "PUKKARI" && (
            <>
              <Typography>{"PUKKARI"}</Typography>
              {!showNav ? (
                <ButtonGroup>
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
          )}
          {popupID.charAt(0) === "R" && (
            <>
              <Typography>{"STAIRS"}</Typography>
              {!showNav ? (
                <ButtonGroup>
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
          )}
          {popupID.charAt(0) === "H" && (
            <>
              <Typography>{"ELEVATOR"}</Typography>
              {!showNav ? (
                <ButtonGroup>
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
          )}
        </>
      )}
    </Popup>
  );
}

export default LeafletPopup;
