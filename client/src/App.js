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
    this.onClick = this.onClick.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentWillMount() {
    this.refresh()
  }

  onClick() {
    this.state.fileList.pop()
    this.setState({fileList: this.state.fileList})
  }

  refresh() {
    console.log('Refreshing file list');
    fetch(`/api/list/files`)
      .then(response => response.json())
      .then(data => {
        this.setState({fileList: data})
        console.log("Refreshed: ", data)
    });
  }

  render() {
    const listItems = this.state.fileList.map(file => <li key={file.name}>{file.name}</li>);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" onClick={this.onClick}>Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>File List</h2>
        <ol>{listItems}</ol>
        <SimpleFileUpload uploadHandler={this.refresh} />
      </div>
    );
  }
}

export default App;
