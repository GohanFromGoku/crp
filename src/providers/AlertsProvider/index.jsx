import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

export const AlertContext = createContext();

const ALERT_VARIANTS = {
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
};

const AlertsProvider = ({ children, timeout = 3000 }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = ({ message = "", variant = ALERT_VARIANTS.INFO }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newAlert = { id, message, variant };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    }, timeout);
  };

  return <AlertContext.Provider value={{ alerts, addAlert, ALERT_VARIANTS }}>{children}</AlertContext.Provider>;
};

AlertsProvider.propTypes = {
  children: PropTypes.any.isRequired,
  timeout: PropTypes.number,
};

export default AlertsProvider;
