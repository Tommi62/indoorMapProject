import { Button } from "@mui/material";
import { useModalData } from "../Hooks/ModalDataHooks";
import InfoIcon from "@mui/icons-material/Info";

interface propTypes {
  name: string;
  setModalContent: Function;
  setModalOpen: Function;
  setKeyWord: Function;
}

const ModalButton = ({
  name,
  setModalContent,
  setModalOpen,
  setKeyWord,
}: propTypes) => {
  const { getModalData } = useModalData();

  const getDataAndOpenModal = async () => {
    const modalData = await getModalData(name);
    if (modalData !== undefined) {
      if (modalData.length !== 0) {
        setModalContent(modalData);
      }
    }
    setKeyWord(name);
    setModalOpen(true);
  };

  return (
    <Button onClick={getDataAndOpenModal}>
      <InfoIcon />
    </Button>
  );
};

export default ModalButton;
