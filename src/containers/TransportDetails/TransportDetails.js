import React from "react";
import { useParams } from "react-router-dom";
import Stopovers from "./Stopovers";

const TransportDetails = () => {
  const { tripId, lineName, stopId } = useParams();

  console.log("stops", tripId, lineName, stopId);

  return <Stopovers key={tripId} stopId={stopId} />;
};

export default TransportDetails;
