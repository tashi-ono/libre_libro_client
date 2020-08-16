import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const DataContext = createContext();
export const DataProvider = (props) => {
  const [allLibraries, setAllLibraries] = useState([]);

  const getAllLibraries = async () => {
    try {
      const res = await axios.get("http://localhost:3000/libraries");
      console.log("all libraries", res.data);
      setAllLibraries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllLibraries();
  }, []);
  return (
    <div>
      <DataContext.Provider value={allLibraries}>
        {props.children}
      </DataContext.Provider>
    </div>
  );
};
