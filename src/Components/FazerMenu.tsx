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
        margin: '0.5rem 0!important',
    },
}));

const FazerMenu = () => {
    const classes = useStyles();
    const fazerTitle = 'Fazer Food & Co. Metropolia Menu'
    const { getFazerModalData } = useModalData();
    const [wholeMenu, setWholeMenu] = useState([]);
    const [oneDayMenu, setOneDayMenu] = useState<setMenus[]>([]);
    const [day, setDay] = useState('Tänään');

    useEffect(() => {
        (async () => {
            try {
                const menu = await getFazerModalData('fi');
                console.log('FAZER', menu);
                setWholeMenu(menu);
                setOneDayMenu(menu[0].SetMenus);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <Grid container justifyContent="center" direction="column">
                <Grid item justifyContent="center">
                    <Typography component="h5" variant="h5" align="center">{fazerTitle}</Typography>
                </Grid>
                <Grid item justifyContent="center">
                    <Typography component="h5" variant="h6" align="center" className={classes.dayTitle}>{day}</Typography>
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
        </>
    );
}
export default FazerMenu;