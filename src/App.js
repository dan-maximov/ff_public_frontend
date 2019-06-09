import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'unistore/react';

import createStore from 'createStore';
import Home from 'pages/home';
import Music from 'pages/music';
import Viewer from 'pages/viewer';

const App = () => (
  <Router>
    <Provider store={createStore()}>
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/music" component={Music} />
        <Route path="/viewer/:name" component={Viewer} />
      </React.Fragment>
    </Provider>
  </Router>
);

export default App;
