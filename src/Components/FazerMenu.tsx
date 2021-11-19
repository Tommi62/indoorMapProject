import { Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useModalData } from '../Hooks/ModalDataHooks';
import { makeStyles } from '@material-ui/core/styles';

interface setMenus {
    map(arg0: (item2: any) => JSX.Element): string | number | boolean | {} | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactNodeArray | import("react").ReactPortal | null | undefined;
    Components: Array<string>
}

const useStyles = makeStyles((theme) => ({
    dayTitle: {
        display: 'inline-block!important',
        margin: '0.5rem 1rem!important',
    },
}));

const FazerMenu = () => {
    const classes = useStyles();
    const fazerTitle = 'Fazer Food & Co. Metropolia Menu'
    const { getFazerModalData } = useModalData();
    const [wholeMenu, setWholeMenu] = useState([]);
    const [oneDayMenu, setOneDayMenu] = useState<setMenus[]>([]);
    const [day, setDay] = useState('Tänään');
    const [menuLength, setMenuLength] = useState(0);
    const [noMenuText, setNoMenuText] = useState('');
    const [previousButtonVisibility, setPreviousButtonVisibility] = useState<VisibilityState>('hidden');
    const [nextButtonVisibility, setnextButtonVisibility] = useState<VisibilityState>('hidden');

    useEffect(() => {
        (async () => {
            try {
                const menu = await getFazerModalData('fi');
                console.log('FAZER', menu);
                let count = 0;
                for (let i = 0; i < menu.length; i++) {
                    if (menu[i].SetMenus.length > 0) {
                        count++;
                    };
                };
                setMenuLength(count);
                if (count === 0) {
                    setNoMenuText('Ruokalistaa ei löytynyt tälle päivälle.');
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

    };

    return (
        <>
            {menuLength > 0 ? (
                <Grid container justifyContent="center" direction="column">
                    <Grid item justifyContent="center">
                        <Typography component="h5" variant="h5" align="center">{fazerTitle}</Typography>
                    </Grid>
                    <Grid container item justifyContent="space-between" alignItems="center" direction="row" >
                        <button style={{ visibility: previousButtonVisibility }} type="button" title="Edellinen" aria-pressed="false" className="fc-prev-button fc-button fc-button-primary"><span className="fc-icon fc-icon-chevron-left"></span></button>
                        <Typography component="h5" variant="h6" align="center" className={classes.dayTitle}>{day}</Typography>
                        <button style={{ visibility: nextButtonVisibility }} type="button" title="Seuraava" aria-pressed="false" className="fc-next-button fc-button fc-button-primary"><span className="fc-icon fc-icon-chevron-right"></span></button>
                    </Grid>
                    <Grid container item>
                        {oneDayMenu.map((item) => (
                            <List>
                                {item.Components.map((item2) => (
                                    <ListItem>{item2}</ListItem>
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