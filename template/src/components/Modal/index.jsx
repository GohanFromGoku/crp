import React from "react";
import useModal from "@hooks/useModal";

const Modal = () => {
  const { modalState } = useModal();
  console.log("modalState", modalState);
  return <div>Modal</div>;
};

export default Modal;
