import {useState, useEffect} from "react";
import {Global} from "@emotion/react";
import {styled} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {InputAdornment, TextField} from "@material-ui/core";
import DirectionsIcon from "@mui/icons-material/Directions";
import {IconButton} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const drawerBleeding = 0;
const drawerBleedingLarge = 20;

const Root = styled("div")(({theme}) => ({
    height: "100%",
    backgroundColor:
        theme.palette.mode === "light"
            ? grey[100]
            : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

interface propTypes {
  navigateTo: Function;
  navigateFrom: Function;
  setMarker: Function;
  setFloor: Function;
  setClickLocation: Function;
  popupID: any;
  clickLocation: boolean;
  open: boolean;
  setOpen: Function;
  end: string;
  start: string;
}

const NavDrawer = ({
  navigateTo,
  navigateFrom,
  setFloor,
  setMarker,
  setClickLocation,
  popupID,
  clickLocation,
  open,
  setOpen,
  end,
  start,
}: propTypes) => {
  const matches = useMediaQuery("(max-width:600px)");
  const [from, setFrom] = useState("KMU21");
  const [to, setTo] = useState("KMU21");
  const [selectedInput, setSelectedInput] = useState("");

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        console.log("toggled", open);
    }, [open]);

  useEffect(() => {
    if (end !== "") {
      setTo("KM" + end);
    }
  }, [end]);

  useEffect(() => {
    if (start !== "") {
      setFrom("KM" + start);
    }
  }, [start]);

  const handleClick = () => {
    const handleTo = to.substring(2).toUpperCase();
    const handleFrom = from.substring(2).toUpperCase();
    navigateTo(handleTo);
    navigateFrom(handleFrom);
    setOpen(false);

        console.log("navigate", handleTo, handleFrom);
    };

    const setFromLocation = () => {
        setSelectedInput("from");
        setClickLocation(true);
        setOpen(false);
        console.log(popupID);
    };

  useEffect(() => {
    console.log("popup shouldvisible", clickLocation);
  }, [clickLocation]);

  useEffect(() => {
    console.log("idchange", popupID, clickLocation, selectedInput);
    if (clickLocation !== false) {
      if (selectedInput === "to") {
        setTo("KM" + popupID);
        setOpen(true);
      }
      if (selectedInput === "from") {
        setFrom("KM" + popupID);
        setOpen(true);
      }
    }
  }, [popupID]);

    const setToLocation = () => {
        setSelectedInput("to");
        setClickLocation(true);
        setOpen(false);
        console.log(popupID);
    };

    useEffect(() => {
    console.log("clicklocation", clickLocation);
    if (!clickLocation) {
      setSelectedInput("");
    }
  }, [clickLocation]);return (
        <Root>
            {matches ? (
                <>
                    <CssBaseline/>
                    <Global
                        styles={{
                            ".MuiDrawer-root > .MuiPaper-root": {
                                height: `calc(30% - ${drawerBleeding}px)`,
                                overflow: "visible",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            },
                        }}
                    />
                    <IconButton
                        color="primary"
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "10px",
                            zIndex: 1000,
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            maxWidth: "40px",
                            maxHeight: "40px"
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        <DirectionsIcon/>
                    </IconButton>

                    <SwipeableDrawer
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={drawerBleeding}
                        disableSwipeToOpen={false}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 5,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}
                        >
                            <Puller/>
                        </StyledBox>
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 2,
                                height: "100%",
                                overflow: "auto",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}
                        >
                            <StyledBox
                                sx={{
                                    width: "80%",
                                    float: "left",
                                    pr: 1,
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    onChange={(e: any) => {
                                        setFrom(e.target.value);
                                    }}
                                    margin="dense"
                                    label="From"
                                    variant="outlined"
                                    fullWidth
                                    value={from}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={setFromLocation}>
                                                    <LocationOnIcon></LocationOnIcon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                ></TextField>
                                <TextField
                                    id="outlined-basic"
                                    onChange={(e: any) => {
                                        setTo(e.target.value);
                                    }}
                                    margin="dense"
                                    label="To"
                                    variant="outlined"
                                    fullWidth
                                    value={to}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={setToLocation}>
                                                    <LocationOnIcon></LocationOnIcon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </StyledBox>
                            <StyledBox
                                sx={{
                                    width: "20%",
                                    float: "right",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                    sx={{
                                        width: "100%",
                                        margin: "8px 0",
                                        height: "5.75rem",
                                        float: "right",
                                        pt: 1,
                                    }}
                                >
                                    Go
                                </Button>
                            </StyledBox>
                        </StyledBox>
                    </SwipeableDrawer>
                </>
            ) : (
                <>
                    <CssBaseline/>
                    <Global
                        styles={{
                            ".MuiDrawer-root > .MuiPaper-root": {
                                height: `13rem`,
                                width: `25rem`,
                                overflow: "visible",
                                borderRadius: 8,
                                margin: "1rem",
                            },
                            ".css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
                                top: "auto !important",
                                bottom: "0",
                            },
                            ".css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                                backgroundColor: "rgb(0 0 0 / 0%) !important",
                            },
                        }}
                    />
                    <IconButton
                        color="primary"
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "10px",
                            zIndex: 1000,
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        <DirectionsIcon/>
                    </IconButton>
                    <SwipeableDrawer
                        anchor="right"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={drawerBleeding}
                        disableSwipeToOpen={false}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 5,
                                borderRadius: 8,
                            }}
                        ></StyledBox>
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 2,
                                height: "100%",
                                overflow: "auto",
                                borderRadius: 8,
                            }}
                        >
                            <StyledBox
                                sx={{
                                    width: "70%",
                                    float: "left",
                                    pr: 1,
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    onChange={(e: any) => {
                                        setFrom(e.target.value);
                                        toggleDrawer(true);
                                    }}
                                    margin="dense"
                                    label="From"
                                    variant="outlined"
                                    fullWidth
                                    value={from}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={setFromLocation}>
                                                    <LocationOnIcon></LocationOnIcon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                ></TextField>
                                <TextField
                                    id="outlined-basic"
                                    onChange={(e: any) => {
                                        setTo(e.target.value);
                                        toggleDrawer(true);
                                    }}
                                    margin="dense"
                                    label="To"
                                    variant="outlined"
                                    fullWidth
                                    value={to}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={setToLocation}>
                                                    <LocationOnIcon></LocationOnIcon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </StyledBox>
                            <StyledBox
                                sx={{
                                    height: "100%",
                                    width: "25%",
                                    float: "right",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                    sx={{
                                        width: "100%",
                                        margin: "8px 0",
                                        height: "5.75rem",
                                        float: "right",
                                        pt: 1,
                                    }}
                                >
                                    Go
                                </Button>
                            </StyledBox>
                        </StyledBox>
                    </SwipeableDrawer>
                </>
            )}
        </Root>
    );
};

export default NavDrawer;
