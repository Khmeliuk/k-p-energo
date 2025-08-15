import { Fab, FormGroup, TextField } from "@mui/material";
import GoogleAutocomplete from "./GoogleAutocomplete";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

const AddressContainer = styled(FormGroup)`
  width: 100%;
  .streetBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
  }
  .googleAutocomplete {
    flex: 1;
  }
  .blockNumber {
    width: 80px;
  }
  .roomNumber {
    width: 80px;
  }
  .addButton {
    width: 50px;
  }
`;

const AddressForm = ({ onChange }) => {
  const [cityName, setCityName] = useState("");
  const [locality, setLocality] = useState(null);
  const [street, setStreet] = useState("");
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [fullstreet, setfullstreet] = useState([]);
  const [fullAddress, setFullAddress] = useState("");
  const [addAddress, setAddAddress] = useState(1);

  const cityBounds = {
    north: 48.73449779732803,
    south: 48.64795237063812,
    east: 26.61678308052667,
    west: 26.54322606905152,
  };

  const createFullAddress = useCallback(() => {
    const all = [cityName, ...fullstreet].filter(Boolean).join(", ") + ".";
    console.log("====================================");
    console.log(all);
    console.log("====================================");
    setFullAddress(all);
    onChange(all);
  }, [cityName, fullstreet]);

  useEffect(() => {
    if (cityName) {
      createFullAddress();
    }
  }, [addAddress]);

  // Зберігаємо місто (bounds для вулиць)
  const getCityLocation = (place) => {
    if (place && place.geometry) {
      setCityName(place.name); // ✅ Назва міста
      const newBounds = {
        north: place.geometry.viewport.getNorthEast().lat(),
        south: place.geometry.viewport.getSouthWest().lat(),
        east: place.geometry.viewport.getNorthEast().lng(),
        west: place.geometry.viewport.getSouthWest().lng(),
      };
      setLocality(newBounds);
    }
  };

  // Зберігаємо вулицю
  const handleStreetSelect = (place) => {
    if (place) {
      setStreet(place);
    }
  };

  // Формуємо повну адресу та передаємо наверх
  const handleAddAddress = () => {
    const formattedBlock = block ? `буд. ${block}` : "";
    const formattedRoom = room ? `кв. ${room}` : "";

    const all = [street, formattedBlock, formattedRoom]
      .filter(Boolean)
      .join(", ");

    if (all && !fullstreet.includes(all)) {
      setfullstreet([...fullstreet, all]);
    }

    // Очищаємо поля
    setStreet("");
    setBlock("");
    setRoom("");
    setAddAddress((pref) => (pref += 1));
  };

  return (
    <AddressContainer>
      <GoogleAutocomplete
        type="city"
        bounds={cityBounds}
        label="Населений пункт"
        getCityLocation={getCityLocation}
      />

      {locality && (
        <div className="streetBlock">
          <div className="googleAutocomplete">
            <GoogleAutocomplete
              type="route"
              label="Вулиця"
              bounds={locality}
              onPlaceSelect={handleStreetSelect}
              inputValue={street}
            />
          </div>
          <div className="blockNumber">
            <TextField
              label="Буд"
              type="text"
              variant="standard"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
            />
          </div>
          <div className="roomNumber">
            <TextField
              label="Кв"
              type="text"
              variant="standard"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="addButton">
            <Fab
              onClick={handleAddAddress}
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

AddressForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default AddressForm;
