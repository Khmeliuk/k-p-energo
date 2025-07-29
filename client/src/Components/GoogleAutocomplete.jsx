// import { useState } from "react";
// import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
// import { API_KEY } from "../constant/constant";
// import { TextField } from "@mui/material";
// import PropTypes from "prop-types";

// const libraries = ["places"];

// const GoogleAutocomplete = ({
//   type = "",
//   label = "Адреса",
//   getCityLocation,
//   cityBounds,
//   onPlaceSelect, // ✅ НОВИЙ ПРОПС
// }) => {
//   const [autocomplete, setAutocomplete] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: API_KEY,
//     libraries,
//     language: "ua",
//   });

//   const handleLoad = (autocomplete) => {
//     setAutocomplete(autocomplete);
//   };

//   const handlerOnPlacesChange = () => {
//     if (autocomplete) {
//       const place = autocomplete.getPlace();
//       console.log("====================================");
//       console.log(place.address_components[0]);
//       console.log("====================================");
//       if (getCityLocation && place.geometry) {
//         getCityLocation(place);
//       }
//       if (onPlaceSelect) {
//         onPlaceSelect(place);
//       }
//     }
//   };

//   return (
//     isLoaded && (
//       <Autocomplete
//         options={{
//           types: [type],
//           componentRestrictions: { country: "ua" },
//           bounds: cityBounds || {
//             north: 49.0797, // Північна межа
//             south: 48.2225, // Південна межа
//             east: 27.2003, // Східна межа
//             west: 25.9616, // Західна межа
//           },
//           strictBounds: true,
//         }}
//         onLoad={handleLoad}
//         onPlaceChanged={handlerOnPlacesChange}
//       >
//         <TextField label={label} variant="outlined" fullWidth required />
//       </Autocomplete>
//     )
//   );
// };

// GoogleAutocomplete.propTypes = {
//   type: PropTypes.string,
//   label: PropTypes.string,
//   getCityLocation: PropTypes.func,
//   cityBounds: PropTypes.object,
//   onPlaceSelect: PropTypes.func,
// };

// export default GoogleAutocomplete;
import { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { API_KEY } from "../constant/constant";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const libraries = ["places"];

const GoogleAutocomplete = ({
  type = "",
  label = "Адреса",
  getCityLocation,
  cityBounds,
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

  const options = {
    types: [type === "city" ? "(cities)" : "address"],
    componentRestrictions: { country: "ua" },
    ...(type === "route" && cityBounds
      ? { bounds: cityBounds, strictBounds: true }
      : {}),
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
  cityBounds: PropTypes.object,
  onPlaceSelect: PropTypes.func,
};

export default GoogleAutocomplete;
