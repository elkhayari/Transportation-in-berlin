import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Typography from "@material-ui/core/Typography";
import "./Stopovers.css";

const Stopovers = (props) => {
  const trip = useSelector((state) => state.trip);
  let stopoverIndex = 0;
  const { stopovers } = trip;

  stopoverIndex = stopovers.findIndex(
    (stopover) => stopover.stop.id == String(props.stopId)
  );
  const stops = stopovers.slice(stopoverIndex, stopovers.length);

  return (
    <div>
      <Link to="/trasnportOptions" style={{ textDecoration: "none" }}>
        <ArrowBackIosIcon />
        {"return back"}
      </Link>
      {Object.keys(trip).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <Grid container>
          <Grid item xs={2} className="header_item">
            <span>Arrival</span>
          </Grid>
          <Grid item xs={2} className="header_item">
            <span>Departure</span>
          </Grid>
          <Grid item xs={7} className="header_item">
            <span>Station</span>
          </Grid>
          <Grid item xs={12} className="trip_container">
            {stops.map((stopover, i) => {
              const {
                arrival,
                plannedArrival,
                departure,
                plannedDeparture,
                stop,
              } = stopover;

              return (
                <Timeline className="timeline">
                  <TimelineItem>
                    <TimelineSeparator className="separator_padding">
                      <TimelineDot color="primary" />
                      {i == stops.length - 1 ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent className="timeline_content">
                      <Grid container>
                        <Grid item xs={2} className="content_time">
                          <span style={{ color: "green" }}>
                            {String(plannedArrival).substring(11, 16)}
                          </span>
                          <br />
                          <span style={{ color: "red" }}>
                            {String(arrival).substring(11, 16)}
                          </span>
                        </Grid>
                        <Grid item xs={2} className="content_time">
                          <span style={{ color: "green" }}>
                            {String(plannedDeparture).substring(11, 16)}
                          </span>
                          <br />
                          <span style={{ color: "red" }}>
                            {String(departure).substring(11, 16)}
                          </span>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography className="timeline_station">
                            {stop.name}, {"Berlin"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              );
            })}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Stopovers;
