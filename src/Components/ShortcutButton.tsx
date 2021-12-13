import { ListItemButton, ListItemText, MenuItem } from "@mui/material";
import { useModalData } from "../Hooks/ModalDataHooks";

interface propTypes {
    name: string,
    type: string,
    setModalContent: Function,
    setModalOpen: Function,
    setKeyWord: Function,
    handleClose: Function,
    setOpenDrawer: Function,
    setRestaurantMenu: Function,
};

const ShortcutButton = ({ name, type, setModalContent, setModalOpen, setKeyWord, handleClose, setOpenDrawer, setRestaurantMenu }: propTypes) => {
    const { getModalData } = useModalData();

    const getDataAndOpenModal = async () => {
        if (name === 'Fazer Menu') {
            setRestaurantMenu(true);
        } else {
            const modalData = await getModalData(name);
            if (modalData !== undefined && modalData.length !== 0) {
                setModalContent(modalData);
            }
            setKeyWord(name);
        }
        setModalOpen(true);
        if (type === 'dropdown') {
            handleClose();
        } else {
            setOpenDrawer(false);
        }
    };

    return (
        <>
            {type === 'dropdown' &&
                <MenuItem onClick={getDataAndOpenModal}>{name}</MenuItem>
            }
            {type === 'drawer' &&
                <ListItemButton onClick={getDataAndOpenModal}>
                    <ListItemText primary={name} />
                </ListItemButton>
            }
        </>
    );
}

export default ShortcutButton;