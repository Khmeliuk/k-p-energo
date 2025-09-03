import { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { API_KEY } from "../../constant/constant";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const libraries = ["places"];

const GoogleAutocomplete = ({
  type = "",
  label = "Адреса",
  getCityLocation,
  bounds,
  onPlaceSelect,
}) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
    language: "uk",
    region: "UA",
  });

  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handlerOnPlacesChange = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    const components = place.address_components || [];

    let valueToSet = "";

    if (type === "city") {
      const cityComponent = components.find((c) =>
        c.types.includes("locality")
      );
      valueToSet = cityComponent?.long_name || place.name;
    }

    if (type === "route") {
      const routeComponent = components.find((c) => c.types.includes("route"));
      valueToSet = routeComponent?.long_name || place.name;
    }

    setInputValue(valueToSet);

    if (getCityLocation && place.geometry) {
      getCityLocation(place);
    }

    if (onPlaceSelect) {
      onPlaceSelect(valueToSet);
    }
  };

  console.log("====================================");
  console.log(bounds, "boundsGoogleqweqweqweqweqwe");
  console.log("====================================");

  const options = {
    types: [type === "city" ? "(cities)" : "address"],
    componentRestrictions: { country: "ua" },
    ...{ bounds: bounds, strictBounds: true },
  };

  return (
    isLoaded && (
      <Autocomplete
        options={options}
        onLoad={handleLoad}
        onPlaceChanged={handlerOnPlacesChange}
      >
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Autocomplete>
    )
  );
};

GoogleAutocomplete.propTypes = {
  type: PropTypes.oneOf(["city", "route"]),
  label: PropTypes.string,
  getCityLocation: PropTypes.func,
  bounds: PropTypes.object,
  onPlaceSelect: PropTypes.func,
};

export default GoogleAutocomplete;
