import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    show: false,
    name: "",
    cancellable: true,
    variant: "primary",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const show = params.get("show-modal") || false;
    const name = params.get("modal-name") || "";
    const cancellable = params.get("cancellable") || true;

    const variant = params.get("variant") || "primary";

    setModalState({ show, name, cancellable, variant });
  }, [window.location.search]);

  return <ModalContext.Provider value={{ modalState, setModalState }}>{children}</ModalContext.Provider>;
};

ModalProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ModalProvider;
