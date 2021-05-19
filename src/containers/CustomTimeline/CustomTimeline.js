import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Import setStopovers action
import { setStopovers } from "../../redux/actions/dataActions";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { Grid, Typography, Paper, Avatar } from "@material-ui/core";
import "./Timeline.css";


const CustomTimeline = ({
  tripId,
  stopId,
  title,
  when,
  plannedWhen,
  lineName,
  product,
  symbol,
  direction,
  end,
  children,
}) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const renderbg = (product) => {
    switch (product) {
      case "bus":
        return "rgb(107, 8, 107)";
      case "subway":
        return "rgb(13, 23, 112)";
      case "tram":
        return "rgb(223, 17, 17)";
      case "suburban":
        return "rgb(32, 97, 13)";
      case "ferry":
        return "rgb(64, 99, 194)";
      case "express":
        return "rgb(231, 229, 74)";
      default:
        return "white";
    }
  };

  const fetchStopovers = async () => {
    const response = await axios
      .get(`https://v5.vbb.transport.rest/trips/${tripId}?lineName=${lineName}`)
      .catch((err) => {
        console.log("Err", err);
      });
    console.log("fetch", response.data);
    dispatch(setStopovers(response.data));
    history.push(`/trasnportDetails/${tripId}/${lineName}/${stopId}`);
  };

  const handleClick = () => {
    console.log("click");
    if (tripId && tripId !== "") fetchStopovers();
  };

  return (
    <Timeline className="timeline">
      {/** Header Item*/}
      <TimelineItem className="timeline_main_item">
        <TimelineSeparator>
          <TimelineDot className="timeline_dot_header" />
          {end ? null : <TimelineConnector />}
          <span className="connectore"></span>
        </TimelineSeparator>
        <TimelineContent className="timeline_content">
          {end || end == null ? (
            <Typography variant="h6" className="timeline_header">
              {title}, {"Berlin"}
            </Typography>
          ) : (
            <>
              <Grid container>
                <Grid item xs={2} className="content_time">
                  <span style={{ color: "green" }}>
                    {String(plannedWhen).substring(11, 16)}
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    {String(when).substring(11, 16)}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" className="timeline_header">
                    {title}, {"Berlin"}
                  </Typography>
                </Grid>
              </Grid>

              <Paper className="paper" onClick={handleClick}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar
                      className="avatar"
                      style={{ backgroundColor: renderbg(product) }}
                    >
                      {symbol
                        ? symbol
                        : String(product).substring(0, 1).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <span>
                      {product} {lineName}{" "}
                    </span>{" "}
                    <br />
                    <Typography className="direction_name">
                      <span style={{ paddingRight: "2%" }}>{">"}</span>
                      {direction}, Berlin
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </TimelineContent>
      </TimelineItem>

      {children}
    </Timeline>
  );
};

export const CustomTimelineSeparator = ({ end }) => (
  <TimelineSeparator className="separator_padding">
    <TimelineDot variant="outlined" className="timeline_dot" />
    {end ? null : <TimelineConnector />}
  </TimelineSeparator>
);

export default CustomTimeline;