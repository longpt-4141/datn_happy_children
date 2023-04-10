import React  from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
// add icon
import "./fontawesome.js"
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/register/Register';

import ListCenters from './pages/centers/list-centers/ListCenters';
import CenterDetail from './pages/centers/center-detail/CenterDetail';

import { ToastContainer } from 'react-toastify';

//routes
import WithAppFrame from './utils/WithAppFrame';
import WithoutAppFrame from './utils/WithoutAppFrame';

const App = () => {

    return (
      <>
        <div className="App">
        <BrowserRouter>           
          <Routes>
            <Route path="/" element={<WithAppFrame/>} >
              <Route index path="/" element={<Home />} exact={true} />
              <Route path="centers">
                <Route index element={<ListCenters/>} />
                <Route path=":id" element={<CenterDetail/>} />
              </Route>
            </Route>
            <Route element={ <WithoutAppFrame/>}>
              <Route path='login' element={<Login />}></Route>
              <Route path='register' element={<Register/>}></Route>
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
        </div>
      </>
    );
  }

export default App;

