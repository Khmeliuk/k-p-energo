import { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { API_KEY } from "../constant/constant";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const libraries = ["places"];

const GoogleAutocomplete = ({
  type = "",
  label = "Адреса",
  takeRefHandler,
  getCityLocation,
  cityBounds,
}) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: libraries,
    language: "ua",
  });
  const handleLoad = (autocomplete) => {
    if (takeRefHandler) {
      takeRefHandler(autocomplete);
    }
    setAutocomplete(autocomplete);
  };

  const handlerOnPlacesChange = () => {
    if (autocomplete && getCityLocation) {
      const place = autocomplete.getPlace(); // Отримуємо місце
      console.log("handlerOnPlacesChange", place);
      getCityLocation(place);
    }
  };
  return (
    isLoaded && (
      <Autocomplete
        options={{
          types: [type],
          componentRestrictions: { country: "ua" },
          bounds: cityBounds || {
            north: 49.0797, // Північна межа
            south: 48.2225, // Південна межа
            east: 27.2003, // Східна межа
            west: 25.9616, // Західна межа
          },
          strictBounds: true, // Включає строгі межі
        }}
        onLoad={handleLoad}
        onPlaceChanged={handlerOnPlacesChange}
      >
        <TextField
          name="address"
          margin="dense"
          label={label}
          variant="outlined"
          fullWidth
          required
        />
      </Autocomplete>
    )
  );
};

GoogleAutocomplete.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  takeRefHandler: PropTypes.func,
  getCityLocation: PropTypes.func,
  cityBounds: PropTypes.object,
};

export default GoogleAutocomplete;
