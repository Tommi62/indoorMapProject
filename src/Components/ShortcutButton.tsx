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
};

const ShortcutButton = ({ name, type, setModalContent, setModalOpen, setKeyWord, handleClose, setOpenDrawer }: propTypes) => {
    const { getModalData } = useModalData();

    const getDataAndOpenModal = async () => {
        const modalData = await getModalData(name);
        if (modalData.length !== 0) {
            setModalContent(modalData);
        }
        setKeyWord(name);
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