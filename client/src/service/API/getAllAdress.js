// import axios from "axios";

// export const fetchAddresses = async () => {
//   const BASE_URL =
//     "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
//   const LOCATION = "48.6833,26.5833";
//   const radius = "5000";
//   const API_KEY = "AIzaSyDs6mZaetYmWUPHz-wdantMPyTU0TnoHao";

//   try {
//     const response = await axios.get(BASE_URL, {
//       params: { location: LOCATION },
//       radius: radius,
//       key: API_KEY,
//     });

//     console.log("====================================");
//     console.log(response);
//     console.log("====================================");
//     return response;
//   } catch (error) {
//     console.error(error.message);
//   }
// };
