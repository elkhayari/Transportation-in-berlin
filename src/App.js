import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Container from "@material-ui/core/Container";
// Components
import Header from "./containers/Header";
import SearchForm from "./containers/SearchForm/SearchForm";
import TransportDetails from "./containers/TransportDetails/TransportDetails";
import TransportOptions from "./containers/TransportOptions";

import "./App.css";

function App() {
  return (
    <Container maxWidth="sm" className="main_page">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={SearchForm} />
          <Route
            path="/trasnportDetails/:tripId/:lineName/:stopId"
            component={TransportDetails}
          />{" "}
          <Route path="/trasnportOptions" component={TransportOptions} />
          <Route>404 page not found</Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
