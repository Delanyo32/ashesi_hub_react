import React, { Component } from 'react';
import './App.css';
import Main from './Main'

class App extends Component {
  render() {
    // console.log(this.props.client)
    return (
      <Main stitch={this.props.client} />
    );
  }
}

export default App;
