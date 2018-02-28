import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// eslint-disable-next-line
import { StitchClient } from "mongodb-stitch";
import { BrowserRouter } from 'react-router-dom'

import { StitchClientFactory } from 'mongodb-stitch'

let appId = 'hub-rnabd';
let client = StitchClientFactory.create(appId);

// const stitch = require("mongodb-stitch")
// const client = new stitch.StitchClient('hub-rnabd');


ReactDOM.render((
  <BrowserRouter>
    <App client={client} />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
