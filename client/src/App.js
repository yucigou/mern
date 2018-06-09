import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SimpleFileUpload from './SimpleFileUpload'

class App extends Component {
  render() {
    fetch(`/api/greet`)
      .then(response => response.json())
      .then(json => {
        console.log('json: ', json);
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SimpleFileUpload/>
      </div>
    );
  }
}

export default App;
