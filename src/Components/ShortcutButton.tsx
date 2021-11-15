import { Button, MenuItem } from "@mui/material";
import { MouseEventHandler } from "react";
import { useModalData } from "../Hooks/ModalDataHooks";

interface propTypes {
    name: string
    setModalContent: Function,
    setModalOpen: Function,
    setKeyWord: Function,
    handleClose: Function,
};

const ShortcutButton = ({ name, setModalContent, setModalOpen, setKeyWord, handleClose }: propTypes) => {
    const { getModalData } = useModalData();

    const getDataAndOpenModal = async () => {
        const modalData = await getModalData(name);
        if (modalData.length !== 0) {
            setModalContent(modalData);
        }
        setKeyWord(name);
        setModalOpen(true);
        handleClose();
    };

    return (
        <MenuItem onClick={getDataAndOpenModal}>{name}</MenuItem>
    );
}

export default ShortcutButton;