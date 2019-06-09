import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Home from 'pages/home';
import Music from 'pages/music';
import Viewer from 'pages/viewer';

const banlist = [
  'friendlyfake',
  'moobot',
  'vivbot',
  'commanderroot',
  'toxic_cat',
  '1111azazazel1111',
  'p0sitivitybot',
  'p0lizei_',
  'bananennanen',
  'skinnyseahorse',
  'apricotdrupefruit',
  'anotherttvviewer'
];

const App = () => {
  const [users, setUsers] = useState([]);
  const [music, setMusic] = useState([]);

  useEffect(() => {
    axios
      .get('/api/users')
      .then(res => {
        setUsers(
          res.data
            .sort((a, b) => b.totalxp - a.totalxp)
            .filter(viewer => !banlist.includes(viewer.username)),
        );
        axios
          .get('/api/music')
          .then(res => setMusic(res.data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <Fragment>
        <Route
          exact
          path="/"
          component={() => <Home users={users.slice(1)} />}
        />
        <Route path="/music" component={() => <Music music={music} />} />
        <Route
          path="/viewer/:name"
          users={users}
          component={({ match }) => <Viewer users={users} match={match} />}
        />
      </Fragment>
    </Router>
  );
};

export default App;
