import React from "react";
import useAlerts from "../../hooks/useAlerts";

const Alerts = () => {
  const { alerts } = useAlerts();
  console.log(alerts);
  return <h1>Alerts</h1>;
};

export default Alerts;
