import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';

//Components
import TransportComponent from "./TransportComponent";

import "./TransportOptions.css";
const TransportOptions = () => {
  const { data } = useSelector((state) => state.data);
  console.log("data", data.length)
  const renderListTrips = data.map((trip) => {
    const {
      tripId,
      stop,
      when,
      plannedWhen,
      line: { name, mode, product, symbol, color },
      direction,
    } = trip;
    return (
      <Grid container>
        <Grid item xs={12} className="trip_container">
          <TransportComponent
            key={tripId + when}
            stopId={stop.id}
            tripId={tripId}
            stopName={stop.name}
            when={when}
            plannedWhen={plannedWhen}
            lineName={name}
            mode={mode}
            product={product}
            symbol={symbol}
            direction={direction}
          />
        </Grid>
      </Grid>
    );
  });

  return (
    <>
      <Link to="/" style={{ textDecoration: "none", padding:"20px" }}>
        <ArrowBackIosIcon />
        {"return back"}
      </Link>
      { data.length > 0 ? renderListTrips : (
        <Alert severity="info">No Departure board Now — <a href="/">try again! </a></Alert>
      )}

    </>
  );
};

export default TransportOptions;
