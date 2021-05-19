import React, { useEffect, useState } from "react";
import autocomplete from "vbb-stations-autocomplete";
import stations from "vbb-stations";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Import our actions
import { setData } from "../../redux/actions/dataActions";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
// Icons
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import Select from "@material-ui/core/Select";
import "./SearchForm.css";

const SearchForm = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [departure, setDeparture] = useState("Seestr");
  const [stops, setStops] = useState([]);
  const [departures, setDepartures] = useState(autocomplete(departure));
  const [departureOn, setDepartureOn] = useState("10");
  const [favArray, setFavArray] = useState([]);
  useEffect(() => {
    console.log("useEffect", departure);
    setDepartures(autocomplete(departure, false, true));

    console.log("departures=>", departures);
    departures.map((d) => {
      console.log("station", stations(d.id)[0].name);
      setStops(
        departures.map((d) => {
          return stations(d.id)[0].name;
        })
      );
    });
  }, [departure]);

  const fetchDepartures = async (id) => {
    console.log(id);
    const response = await axios
      .get(
        `https://v5.vbb.transport.rest/stops/${id}/departures?duration=${departureOn}`
      )
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setData(response.data));
    history.push("/trasnportOptions");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDepartures(departures[0].id);
  };

  const handleRadioChange = (event) => {
    setDepartureOn(event.target.value);
  };

  const handleClickFavorite = () => {
    console.log("add to favorite", departure);

    if (localStorage.getItem("favorites") == null) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
    if (favArray.includes(departure)) {
      console.log(
        "already Exists, then add instructions to delete it from local storage"
      );
    } else {
      favArray.push(departure);
      localStorage.setItem("favorites", JSON.stringify(favArray));
      setFavArray(JSON.parse(localStorage.getItem("favorites")));
    }
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeSelect = (event) => {
    setDeparture(event.target.value);
  };

  return (
    <div className="search_form">
      <FormControl>
        <Autocomplete
          id="departure"
          value={departure}
          inputValue={departure}
          onInputChange={(event, newInputValue) => {
            setDeparture(newInputValue);
          }}
          options={stops.map((option) => option)}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Departure Station:"
              variant="outlined"
            />
          )}
        />

        <FormHelperText>
          Add to favorite{" "}
          <IconButton aria-label="delete" onClick={handleClickFavorite}>
            {favArray && favArray.includes(departure) ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>{" "}
        </FormHelperText>

        <Chip label="OR" variant="outlined" color="primary" />

        <span className="favorite-label">Select From Favorite stop(s):</span>
        <Select
          value={departure}
          onChange={handleChangeSelect}
          inputProps={{
            id: "select-multiple",
          }}
        >
          {favArray &&
            favArray.map((fav) => {
              return <option value={fav}>{fav}</option>;
            })}

          {favArray === null && <option>Empty</option>}
        </Select>

        <div className="radio_group">
          <FormLabel component="legend" className="form_label">
            Departure On:
          </FormLabel>
          <RadioGroup
            aria-label="10"
            name="quiz"
            value={departureOn}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="10" control={<Radio />} label="Now" />
            <FormControlLabel value="20" control={<Radio />} label="20 min" />
            <FormControlLabel value="30" control={<Radio />} label="+30 min" />
          </RadioGroup>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={departure === ""}
        >
          GO !!!
        </Button>
      </FormControl>
    </div>
  );
};

export default SearchForm;
