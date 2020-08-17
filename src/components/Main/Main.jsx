import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import apiUrl from "../../apiConfig";
import axios from "axios";
import Homepage from "../Homepage/Homepage";
// import PopUpDetails from "../PopUpDetails/PopUpDetails";
import LibraryPage from "../LibraryPage/LibraryPage";
import FindLibrary from "../FindLibrary/FindLibrary";
import About from "../About/About";
import "./Main.scss";

const Main = () => {
  const [allLibraries, setAllLibraries] = useState([]);

  const getAllLibraries = async () => {
    try {
      const res = await axios.get(`${apiUrl}/libraries`);
      // console.log("all libraries from main", res.data);
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
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/libraries/:id"
          render={(props) => (
            <LibraryPage {...props} getAllLibraries={getAllLibraries} />
          )}
        />
        <Route
          exact
          path="/libraries"
          render={() => (
            <FindLibrary
              allLibraries={allLibraries}
              getAllLibraries={getAllLibraries}
            />
          )}
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </main>
  );
};

export default Main;
