import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MyContext = createContext();

export const MyProvider = function ({ children }) {
  const [store, setStore] = useState(null);
  return (
    <MyContext.Provider value={{ store, setStore }}>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = { children: PropTypes.node.isRequired };
