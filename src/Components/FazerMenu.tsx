import { Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useModalData } from '../Hooks/ModalDataHooks';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

interface setMenus {
    map(arg0: (item2: any) => JSX.Element): string | number | boolean | {} | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactNodeArray | import("react").ReactPortal | null | undefined;
    Components: Array<string>
}

interface menuArray {
    Date: string,
    SetMenus: setMenus[],
}

const useStyles = makeStyles((theme) => ({
    container: {
        maxHeight: '100vh',
    },
    listContainer: {
        maxHeight: '75vh',
        overflowY: 'auto',
    },
    dayTitle: {
        display: 'inline-block!important',
        margin: '0.5rem 1rem!important',
        [theme.breakpoints.down(550)]: {
            fontSize: '0.9rem!important',
        },
    },
    fazerTitle: {
        [theme.breakpoints.down(550)]: {
            fontSize: '1.1rem!important',
        },
    },
    listItem: {
        [theme.breakpoints.down(550)]: {
            fontSize: '0.8rem!important',
        },
    }
}));

const FazerMenu = () => {
    const classes = useStyles();
    const fazerTitle = 'Fazer Food & Co. Metropolia Menu'
    const { getFazerModalData } = useModalData();
    const [wholeMenu, setWholeMenu] = useState<menuArray[]>([]);
    const [oneDayMenu, setOneDayMenu] = useState<setMenus[]>([]);
    const [day, setDay] = useState('Today');
    const [dayIndex, setDayIndex] = useState(0);
    const [menuLength, setMenuLength] = useState(0);
    const [noMenuText, setNoMenuText] = useState('');
    const [previousButtonVisibility, setPreviousButtonVisibility] = useState<VisibilityState>('hidden');
    const [nextButtonVisibility, setnextButtonVisibility] = useState<VisibilityState>('hidden');

    useEffect(() => {
        (async () => {
            try {
                const menu = await getFazerModalData('en');
                console.log('FAZER', menu);
                let count = 0;
                for (let i = 0; i < menu.length; i++) {
                    if (menu[i].SetMenus.length > 0) {
                        count++;
                    };
                };
                setMenuLength(count - 1);
                if (count === 0) {
                    setNoMenuText('No menu was found for this day.');
                } else if (count > 1) {
                    setnextButtonVisibility('visible');
                }
                setWholeMenu(menu);
                setOneDayMenu(menu[0].SetMenus);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    const nextDay = () => {
        if (dayIndex < menuLength) {
            setOneDayMenu(wholeMenu[dayIndex + 1].SetMenus);
            if (dayIndex + 1 === menuLength) {
                setnextButtonVisibility('hidden');
            }
            if (dayIndex + 1 === 1) {
                setDay('Tomorrow');
            } else {
                const date = wholeMenu[dayIndex + 1].Date;
                const formattedDate = moment(date).format('MMMM DD YYYY');
                setDay(formattedDate);
            }
            setDayIndex(dayIndex + 1);
            setPreviousButtonVisibility('visible');
        }
    };

    const previousDay = () => {
        if (dayIndex > 0) {
            setOneDayMenu(wholeMenu[dayIndex - 1].SetMenus);
            if (dayIndex - 1 === 0) {
                setPreviousButtonVisibility('hidden');
            }
            if (dayIndex - 1 === 1) {
                setDay('Tomorrow');
            } else if (dayIndex - 1 === 0) {
                setDay('Today');
            } else {
                const date = wholeMenu[dayIndex - 1].Date;
                const formattedDate = moment(date).format('MMMM DD YYYY');
                setDay(formattedDate);
            }
            setDayIndex(dayIndex - 1);
            setnextButtonVisibility('visible');
        }
    }

    return (
        <>
            {menuLength > 0 ? (
                <Grid className={classes.container} container justifyContent="center" direction="column">
                    <Grid item justifyContent="center">
                        <Typography className={classes.fazerTitle} component="h5" variant="h5" align="center">{fazerTitle}</Typography>
                    </Grid>
                    <Grid style={{ flexWrap: 'nowrap' }} container item justifyContent="space-between" alignItems="center" direction="row" >
                        <button onClick={previousDay} style={{ visibility: previousButtonVisibility }} type="button" title="Edellinen" aria-pressed="false" className="fc-prev-button fc-button fc-button-primary"><span className="fc-icon fc-icon-chevron-left"></span></button>
                        <Typography component="h5" variant="h6" align="center" className={classes.dayTitle}>{day}</Typography>
                        <button onClick={nextDay} style={{ visibility: nextButtonVisibility }} type="button" title="Seuraava" aria-pressed="false" className="fc-next-button fc-button fc-button-primary"><span className="fc-icon fc-icon-chevron-right"></span></button>
                    </Grid>
                    <Grid className={classes.listContainer} container item direction="column" wrap="nowrap">
                        {oneDayMenu.map((item) => (
                            <List style={{ display: 'flex', flexDirection: 'column' }}>
                                {item.Components.map((item2) => (
                                    <ListItem className={classes.listItem}>{item2}</ListItem>
                                ))}{' '}
                            </List>
                        ))}{' '}
                    </Grid>
                </Grid>
            ) : (
                <Grid item justifyContent="center">
                    <Typography component="h5" variant="h5" align="center">{noMenuText}</Typography>
                </Grid>
            )}
        </>
    );
}
export default FazerMenu;