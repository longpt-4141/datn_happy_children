import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {store, persistor} from './services/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </React.StrictMode>
  ,
  root
)
