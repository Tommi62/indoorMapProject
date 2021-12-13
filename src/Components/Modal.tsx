import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import fiLocale from "@fullcalendar/core/locales/fi";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import tippy, { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import FazerMenu from "./FazerMenu";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down(1000)]: {
      width: "85vw!important",
      maxHeight: '95vh!important',
    },
  },
  shortcut: {
    marginTop: "0.5rem",
  },
  shortcutButton: {
    [theme.breakpoints.down(600)]: {
      fontSize: '0.6rem!important',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    fontSize: '1.1rem!important',
    cursor: 'pointer'
  }
}));

interface modalContentArray {
  success: boolean;
  name: string;
  group: string;
  room: string;
  startDate: string;
  endDate: string;
}

interface startEndObject {
  start: string;
  end: string;
}

interface propTypes {
  modalOpen: boolean;
  setModalOpen: Function;
  modalContent: modalContentArray[];
  setModalContent: Function;
  setMarker: Function;
  keyWord: string;
  updateShortcuts: number;
  setUpdateShortcuts: Function;
  updateOwnList: number,
  setUpdateOwnList: Function,
  restaurantMenu: boolean;
  setRestaurantMenu: Function;
  noOwnListNotification: boolean;
  setNoOwnListNotification: Function;
  showGroupsAndRealizations: string[];
  setShowGroupsAndRealizations: Function;
}

const Modal = ({
  modalOpen,
  setModalOpen,
  modalContent,
  setModalContent,
  keyWord,
  updateShortcuts,
  setUpdateShortcuts,
  updateOwnList,
  setUpdateOwnList,
  restaurantMenu,
  setRestaurantMenu,
  setMarker,
  noOwnListNotification,
  setNoOwnListNotification,
  showGroupsAndRealizations,
  setShowGroupsAndRealizations,
}: propTypes) => {
  const classes = useStyles();
  const [isShortcut, setIsShortcut] = useState(false);
  const [shortcutLimiter, setShortcutLimiter] = useState(false);
  const [isRoom, setIsRoom] = useState(false);
  const [isInYourOwnList, setIsInYourOwnList] = useState(false);
  const [calendarStartAndEnd, setCalendarStartAndEnd] =
    useState<startEndObject>({
      start: "",
      end: "",
    });

  const handleClose = () => {
    setModalOpen(false);
    setRestaurantMenu(false);
    setNoOwnListNotification(false);
    setShowGroupsAndRealizations([]);
    setModalContent([
      {
        success: false,
        name: "",
        group: "",
        room: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const add = (type: string) => {
    if (localStorage.getItem(type) !== null) {
      const shortcutArray = JSON.parse(localStorage.getItem(type)!);
      shortcutArray.push(keyWord);
      localStorage.setItem(type, JSON.stringify(shortcutArray));
    } else {
      const shortcutArray = [keyWord];
      localStorage.setItem(type, JSON.stringify(shortcutArray));
    }
    if (type === 'shortcuts') {
      setIsShortcut(true);
      setUpdateShortcuts(Date.now());
    } else {
      setIsInYourOwnList(true);
      setUpdateOwnList(Date.now());
    }
  };

  const remove = (type: string) => {
    if (localStorage.getItem(type) !== null) {
      const shortcutArray = JSON.parse(localStorage.getItem(type)!);
      for (let i = 0; i < shortcutArray.length; i++) {
        if (shortcutArray[i] === keyWord) {
          shortcutArray.splice(i, 1);
          localStorage.setItem(type, JSON.stringify(shortcutArray));
          break;
        }
      }
    }
    if (type === 'shortcuts') {
      setIsShortcut(false);
      setUpdateShortcuts(Date.now());
    } else {
      setIsInYourOwnList(false);
      setUpdateOwnList(Date.now());
    }
  };

  const targetGRRemove = (name: string) => {
    if (localStorage.getItem('ownList') !== null) {
      const ownList = JSON.parse(localStorage.getItem('ownList')!);
      for (let i = 0; i < ownList.length; i++) {
        if (ownList[i] === name) {
          ownList.splice(i, 1);
          localStorage.setItem('ownList', JSON.stringify(ownList));
          if (ownList.length === 0) {
            setNoOwnListNotification(true);
          }
          break;
        }
      }
      setShowGroupsAndRealizations(ownList);
    }
  };

  useEffect(() => {
    try {
      if (!restaurantMenu) {
        setIsShortcut(false);
        if (localStorage.getItem("shortcuts") !== null) {
          const shortcutArray = JSON.parse(localStorage.getItem("shortcuts")!);
          if (shortcutArray.length >= 14) {
            setShortcutLimiter(true);
          } else {
            setShortcutLimiter(false);
          }
          for (let i = 0; i < shortcutArray.length; i++) {
            if (shortcutArray[i] === keyWord) {
              setIsShortcut(true);
              break;
            }
          }
        }
        const today = moment().format("YYYY-MM-DD");
        setCalendarStartAndEnd({
          start: today,
          end: today,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [keyWord, updateShortcuts]);

  useEffect(() => {
    try {
      if (keyWord.startsWith('KM')) {
        setIsRoom(true);
      } else {
        setIsRoom(false);
      }

      setIsInYourOwnList(false);
      if (localStorage.getItem("ownList") !== null) {
        const ownListArray = JSON.parse(localStorage.getItem("ownList")!);
        for (let i = 0; i < ownListArray.length; i++) {
          if (ownListArray[i] === keyWord) {
            setIsInYourOwnList(true);
            break;
          }
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [keyWord, updateOwnList]);

  return (
    <MuiModal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40vw",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        className={classes.box}
      >
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
        {showGroupsAndRealizations.length > 0 ? (
          <Grid container direction="column">
            <Typography
              variant="h6"
              component="h6"
              style={{ textAlign: "center" }}
              className={'grHeader'}
            >
              Your groups and realizations
            </Typography>
            <Grid container item direction="column">
              {showGroupsAndRealizations.map((item) => (
                <Grid key={item} container item justifyContent="space-between">
                  <Typography className={'grItem'} variant="body1" component="div">
                    {item}
                  </Typography>
                  <DeleteIcon className={'deleteIcon'} onClick={() => targetGRRemove(item)} />
                </Grid>
              ))}{" "}
            </Grid>
          </Grid>
        ) : (
          <>
            {noOwnListNotification ? (
              <>
                <Grid justifyContent="center">
                  <Typography
                    variant="h6"
                    component="h6"
                    className={'noOwnListHeader'}
                  >
                    There is nothing in your own list!
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    className={'noOwnListText'}
                  >
                    Please add realizations and/or groups to your own list to use this feature.
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                {restaurantMenu ? (
                  <FazerMenu />
                ) : (
                  <>
                    {modalContent[0].success ? (
                      <>
                        <FullCalendar
                          locales={[fiLocale]}
                          locale="fi"
                          dayHeaderContent={keyWord}
                          plugins={[timeGridPlugin, interactionPlugin]}
                          headerToolbar={{
                            left: "prev",
                            center: "title",
                            right: "next",
                          }}
                          initialView="timeGridDay"
                          allDaySlot={false}
                          slotLabelFormat={[{ hour: "numeric", minute: "2-digit" }]}
                          slotMinTime="08:00:00"
                          slotMaxTime="21:00:00"
                          height={"70vh"}
                          views={{
                            timeGrid: {
                              visibleRange: {
                                start: calendarStartAndEnd.start,
                                end: calendarStartAndEnd.end,
                              },
                            },
                          }}
                          events={modalContent.map((data) => {
                            return {
                              title: data.name + " " + data.group + " " + data.room,
                              start: new Date(data.startDate),
                              end: new Date(data.endDate),
                              extendedProps: {
                                subject: data.name,
                                group: data.group,
                                room: data.room,
                              },
                            };
                          })}
                          eventClick={(e) =>
                            console.log(e.event._def.extendedProps.room)
                          }
                          nowIndicator={true}
                          eventMouseEnter={(arg) => {
                            tippy(arg.el, {
                              content:
                                "Subject: " +
                                arg.event._def.extendedProps.subject +
                                "<br>" +
                                "Group(s): " +
                                arg.event._def.extendedProps.group +
                                "<br>" +
                                "Room: " +
                                arg.event._def.extendedProps.room,
                              allowHTML: true,
                              theme: "calendar",
                              animation: "scale",
                              arrow: false,
                              followCursor: true,
                              plugins: [followCursor],
                            });
                          }}
                        />
                        <Grid
                          container
                          justifyContent="center"
                          className={classes.shortcut}
                        >
                          {isShortcut ? (
                            <Button className={classes.shortcutButton} onClick={() => remove('shortcuts')}>Remove shortcut</Button>
                          ) : (
                            <>
                              {!shortcutLimiter && (
                                <Button className={classes.shortcutButton} onClick={() => add('shortcuts')}>Add shortcut</Button>
                              )}
                            </>
                          )}
                          {!isRoom &&
                            <>
                              {isInYourOwnList ? (
                                <Button className={classes.shortcutButton} onClick={() => remove('ownList')}>Remove from my classes</Button>
                              ) : (
                                <Button className={classes.shortcutButton} onClick={() => add('ownList')}>Add to my classes</Button>
                              )}
                            </>
                          }
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          style={{ textAlign: "center" }}
                        >
                          No search results found
                        </Typography>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </MuiModal>
  );
};

export default Modal;
