import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Homepage from "../Homepage/Homepage";
import LibraryDetails from "../LibraryDetails/LibraryDetails";
import FindLibrary from "../FindLibrary/FindLibrary";
import "./Main.scss";

const Main = () => {
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
    <main>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/libraries"
          render={() => <FindLibrary allLibraries={allLibraries} />}
        />
        <Route exact path="/libraries/:id" component={LibraryDetails} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </main>
  );
};

export default Main;
