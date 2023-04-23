import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {UserProvider} from './context/UserProvider.js';
import {store, persistor} from './services/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <UserProvider> */}
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
      {/* </UserProvider> */}
    </Provider>
  </React.StrictMode>
  ,
  root
)
