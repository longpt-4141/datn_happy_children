import React  from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
// add icon
import "./fontawesome.js"
import './App.scss'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/register/Register';

import Centers from './pages/centers';
import CenterDetail from './pages/centers/center-detail/CenterDetail';

import { ToastContainer } from 'react-toastify';

//routes
import WithAppFrame from './utils/WithAppFrame';
import WithoutAppFrame from './utils/WithoutAppFrame';
import AddCenter from './pages/centers/center-add/AddCenter';

// context
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';

const App = () => {
const {user} = useContext(UserContext)
console.log(user)
    return (
      <>
        <div className="App">
          <BrowserRouter>           
            <Routes>
              <Route path="/" element={<WithAppFrame/>} >
                <Route index path="/" element={<Home />} exact={true} />
                <Route path="centers">
                  <Route index element={<Centers />} />
                  <Route path=":id" element={<CenterDetail/>} />
                  <Route path="add" element={<AddCenter/>} />
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

