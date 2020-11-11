import { useEffect, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useHistory, withRouter } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import Table from "./components/table";
import Profile from "./components/profile";

import "./styles/defaults.css";
import "./styles/table.css";
import "./styles/form.css";

function App() {
  const history = useHistory();
  const [globalDB, setGlobalDB] = useState([]);
  const API_URL = "https://swapi.dev/api/people/";

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        const data = _.map(response.data.results,  function(o) {
          o.uuid = uuidv4();
          return o;
        });

        setGlobalDB(data);
      })
      .catch(error => {
        console.error("Failed to fetch from - https://swapi.dev/api/people/. Backtrace: ", error);
      });
  }, []);

  function updateProfile(profile) {
    let newProfiles = globalDB;
    const profileIndex = _.findIndex(newProfiles, { 'uuid': profile.uuid });
    _.remove(newProfiles, { 'uuid': profile.uuid });
    newProfiles.splice(profileIndex, 0, profile);
    setGlobalDB(newProfiles);
    history.push("/");
  };

  function deleteProfile(uuid) {
    let newProfiles = globalDB;
    _.remove(newProfiles, { 'uuid': uuid });
    setGlobalDB(newProfiles);
    history.push("/");
  }

  return (
    <div className="container">
      <div className="menu">
        <Link className="link-left" to="/">Home</Link>
        <a className="link-right" href="https://github.com/joshi-chinmay/crud-react-app" target="_blank" rel="noreferrer">GitHub</a>
        <a className="link-right" href="https://chinmay-joshi.com/" target="_blank" rel="noreferrer">Website</a>
      </div>

      <Switch>
        <Route exact path="/">
          <Table globalDB={globalDB} deleteProfile={deleteProfile} />
        </Route>

        <Route exact path="/profiles/:uuid">
          <Profile globalDB={globalDB} updateProfile={updateProfile} />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);