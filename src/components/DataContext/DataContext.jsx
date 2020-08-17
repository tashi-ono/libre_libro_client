import React, { useState, useEffect, createContext } from "react";
import apiUrl from "../../apiConfig";
import axios from "axios";

export const DataContext = createContext();
export const DataProvider = (props) => {
  const [allLibraries, setAllLibraries] = useState([]);

  const getAllLibraries = async () => {
    try {
      const res = await axios.get(`${apiUrl}/libraries`);
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
      <DataContext.Provider value={[allLibraries, setAllLibraries]}>
        {props.children}
      </DataContext.Provider>
    </div>
  );
};
