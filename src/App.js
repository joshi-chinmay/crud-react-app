import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

import Table from "./components/table";
import Profile from "./components/profile";
import uuid from "./helpers/uuid";

import "./styles/defaults.css";
import "./styles/table.css";
import "./styles/button.css";

function App() {
  const [indexDB, setIndexDB] = useState([]);

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/")
      .then(response => {
        let data = response.data.results;
        data.map(o => o.uuid = uuid());

        setIndexDB(data);
      })
      .catch(error => {
        console.error("Failed to fetch from - https://swapi.dev/api/people/. Backtrace: ", error);
      })
  }, []);

  return (
    <Router>
      <div className="App">
        <Link to="/"> Home </Link>

        <Switch>
          <Route exact path="/">
            <Table indexDB={indexDB} />
          </Route>

          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;