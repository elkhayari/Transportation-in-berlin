import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    paddingBottom: "10px",
  },
  app_bar: {
    backgroundColor: "#d9def2",
    borderRadius: "20px",
  },
  title: {
    flexGrow: 1,
    fontSize: "12px",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fix" className={classes.app_bar}>
        <Toolbar>
          <Typography className={classes.title}>
            <h1>
              <span style={{ color: "rgb(223, 17, 17)" }}>T</span>ran
              <span style={{ color: "rgb(32, 97, 13)" }}>S</span>
              <span style={{ color: "rgb(107, 8, 107)" }}>B</span>erli
              <span style={{ color: "#ffd700" }}>N</span>
            </h1>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
