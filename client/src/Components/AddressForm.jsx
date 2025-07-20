import { Fab, FormGroup, TextField } from "@mui/material";
import GoogleAutocomplete from "./GoogleAutocomplete";
import styled from "styled-components";
import { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

const AddressContainer = styled(FormGroup)`
  width: 100%;
  .streetBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .googleAutocomplete {
    flex-basis: 50%;
  }
  .blockNumber {
    flex-basis: 15%;
  }
  .roomNumber {
    flex-basis: 15%;
  }
  .addButton {
    flex-basis: 10%;
  }
`;

const AddressForm = () => {
  const [locality, setLocality] = useState(null);

  const [street, setstreet] = useState("");
  const cityInputRef = useRef(null);

  const getCityLocation = (bounds) => {
    const newBounds = {
      north: bounds.geometry.viewport.getNorthEast().lat(),
      south: bounds.geometry.viewport.getSouthWest().lat(),
      east: bounds.geometry.viewport.getNorthEast().lng(),
      west: bounds.geometry.viewport.getSouthWest().lng(),
    };
    setLocality(newBounds);
  };

  const takeRefHandler = (e) => {
    cityInputRef.current = e;
  };

  const onClickHandler = (e) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  };

  return (
    <AddressContainer>
      <GoogleAutocomplete
        type="locality"
        label="Населений пункт"
        getCityLocation={getCityLocation}
      />
      {locality && (
        <div className="streetBlock">
          <div className="googleAutocomplete">
            <GoogleAutocomplete
              type="route"
              label="Вулиця"
              cityBounds={locality}
              takeRefHandler={takeRefHandler}
            />
          </div>
          <div className="blockNumber">
            {" "}
            <TextField
              id="standard-number"
              label="Буд"
              type="number"
              variant="standard"
            />
          </div>
          <div className="roomNumber">
            {" "}
            <TextField
              id="standard-number"
              label="Кв"
              type="number"
              variant="standard"
              size=""
            />
          </div>
          <div className="addButton">
            {" "}
            <Fab
              onClick={onClickHandler}
              color="primary"
              aria-label="add"
              size="small"
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      )}
    </AddressContainer>
  );
};

export default AddressForm;
