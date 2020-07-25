import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
