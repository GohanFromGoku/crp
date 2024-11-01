import { AlertContext } from "@providers";
import { useContext } from "react";

const useAlerts = () => {
  const { alerts, addAlert, ALERT_VARIANTS } = useContext(AlertContext);
  return { alerts, addAlert, ALERT_VARIANTS };
};

export default useAlerts;
