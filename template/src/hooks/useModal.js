import { ModalContext } from "@providers";
import { useContext } from "react";

const useModal = () => {
  const MODAL_VARIANTS = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
  };

  const { modalState, setModalState } = useContext(ModalContext);
  return { modalState, setModalState, MODAL_VARIANTS };
};

export default useModal;
