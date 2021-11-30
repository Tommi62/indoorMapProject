import { Button, ButtonGroup, Typography } from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import { Popup } from "react-leaflet";

interface propTypes {
  popupPosition: any;
  handlePopupClose: any;
  popupID: string;
  showNav: boolean;
  getDataAndOpenModal: any;
  showNavigationButtons: any;
  navigateFrom: any;
  navigateTo: any;
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
}: propTypes) {
  return (
    <Popup position={popupPosition} onClose={handlePopupClose}>
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
        {popupID.charAt(0) === "V" && (
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
        {(popupID.charAt(0) === "R" || popupID.charAt(0) === "K") && (
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
    </Popup>
  );
}

export default LeafletPopup;
