import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducers from './store/reducers/rootReducers';

const root = document.getElementById('root');
const reduxStore = createStore(rootReducers)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
  ,
  root
)
