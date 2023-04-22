import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

import {UserProvider} from './context/UserProvider.js';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={reduxStore}> */}
      <UserProvider>
        <App />
      </UserProvider>
    {/* </Provider> */}
  </React.StrictMode>
  ,
  root
)
