import {
    AppBar,
    makeStyles,
    Toolbar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: '3rem'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0 1rem'
    },
    title: {
        paddingBottom: '0.3rem'
    }
}));

const Nav = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <h3 className={classes.title}>App</h3>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Nav;