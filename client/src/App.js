import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SimpleFileUpload from './SimpleFileUpload'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  }

  componentWillMount() {
    fetch(`/api/list/files`)
      .then(response => response.json())
      .then(data => {
        this.setState({fileList: data})
    });
  }

  render() {
    const listItems = this.state.fileList.map(file => <li key={file.name}>{file.name}</li>);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>File List</h2>
        <ol>{listItems}</ol>
        <SimpleFileUpload/>
      </div>
    );
  }
}

export default App;
