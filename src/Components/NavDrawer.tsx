import { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
    createTheme,
    InputAdornment,
    TextField,
    Typography,
} from "@material-ui/core";
import DirectionsIcon from "@mui/icons-material/Directions";
import { IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor:
        theme.palette.mode === "light"
            ? grey[100]
            : theme.palette.background.default,
}));

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: "#F46036",
            contrastText: "#FFF",
        },
    },
});

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
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
    const [toClass, setToClass] = useState("");
    const [fromClass, setFromClass] = useState("");
    const [selectedInput, setSelectedInput] = useState("");
    const [pop, setPop] = useState("0px");
    const [sliderCSS, setSliderCSS] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        if (open) {
            setPop("0px");
        }
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
    };

    const setFromLocation = () => {
        setPop("100px");
        setSelectedInput("from");
        setClickLocation(true);
        setOpen(false);
    };

    useEffect(() => {
        if (clickLocation !== false) {
            if (selectedInput === "to") {
                setToClass("blinkOnce");
                setTo("KM" + popupID);
                setOpen(true);
                setPop("0px");
                setTimeout(() => {
                    setToClass("");
                }, 1000);
            }
            if (selectedInput === "from") {
                setFromClass("blinkOnce");
                setFrom("KM" + popupID);
                setOpen(true);
                setPop("0px");
                setTimeout(() => {
                    setFromClass("");
                }, 1000);
            }
        }
    }, [popupID]);

    const setToLocation = () => {
        setPop("100px");
        setSelectedInput("to");
        setClickLocation(true);
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setSliderCSS(true);
        } else {
            setTimeout(() => {
                setSliderCSS(false);
            }, 200);
        }
    }, [open]);

    return (
        <Root>
            <StyledBox
                sx={{
                    position: "absolute",
                    top: pop,
                    left: "50%",
                    zIndex: "1000",
                    transform: "translate(-50%, -50%)",
                    padding: "1rem",
                    borderRadius: "8px",
                    color: "gray",
                    border: "1px solid #ebebeb",
                    transition: "0.5s top",
                }}
            >
                <Typography>Click a room to select</Typography>
            </StyledBox>
            {matches ? (
                <>
                    <CssBaseline />
                    {sliderCSS && (
                        <Global
                            styles={{
                                ".MuiDrawer-root > .MuiPaper-root": {
                                    height: `calc(30% - ${drawerBleeding}px)!important`,
                                    overflow: "visible!important",
                                    borderTopLeftRadius: "8px !important",
                                    borderTopRightRadius: "8px !important",
                                },
                            }}
                        />
                    )}
                    <IconButton
                        color="primary"
                        style={{
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            position: "absolute",
                            bottom: "20px",
                            right: "10px",
                            zIndex: 1000,
                            background: "rgba(255, 255, 255, 0.9)",
                            maxWidth: "40px",
                            maxHeight: "40px",
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        <DirectionsIcon className="dirIcon" />
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
                            <Puller />
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
                                    className={fromClass}
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
                                    className={toClass}
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
                    <CssBaseline />
                    {sliderCSS && (
                        <Global
                            styles={{
                                ".MuiDrawer-root > .MuiPaper-root": {
                                    height: `13rem !important`,
                                    width: `25rem !important`,
                                    overflow: "visible !important",
                                    borderRadius: "8px !important",
                                    margin: "1rem !important",
                                },
                                ".css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
                                    top: "auto !important",
                                    bottom: "0 !important",
                                },
                                ".css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                                    backgroundColor: "rgb(0 0 0 / 0%) !important",
                                },
                            }}
                        />
                    )}
                    <IconButton
                        color="primary"
                        style={{
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            position: "absolute",
                            bottom: "20px",
                            right: "10px",
                            zIndex: 1000,
                            background: "rgba(255, 255, 255, 0.9)",
                            maxWidth: "40px",
                            maxHeight: "40px",
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        <DirectionsIcon className="dirIcon" />
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
                                    className={fromClass}
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
                                    className={toClass}
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
