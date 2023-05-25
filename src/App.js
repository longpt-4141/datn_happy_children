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

import socketClient from "socket.io-client";

//routes
import WithAppFrame from './utils/WithAppFrame';
import WithoutAppFrame from './utils/WithoutAppFrame';
import AddCenter from './pages/centers/center-add/AddCenter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAccessToken, selectCurrentToken, selectUserRole } from './services/slicer/AuthSlicer.js';
import RequestPage from './pages/requests';
import AddRequest from './pages/center_role/request-add/AddRequest';
import RequestDetail from './pages/requests/request-detail/RequestDetail';
import ReportPage from './pages/reports';
import ReportDetail from './pages/reports/report-detail/ReportDetail';
import AddReport from './pages/center_role/report-add/AddReport';
import { useState } from 'react';
import { getAllNotifications } from './services/slicer/NotificationSlicer';
import News from './pages/news/News';
import StatisticPage from './pages/statistics';
import AddNew from './pages/news/news-add/AddNew';
import EditNews from './pages/news/news-edit/EditNews';
import NewsDetail from './pages/news/news-detail/NewsDetail';

const App = () => {
  // const SERVER = "http://127.0.0.1:8080";
  // var socket = socketClient (SERVER);
  // socket.emit('notification', {msg : 'long'});
  // socket.on('notification', msg => {
  //   console.log('>>>>>>>>>>>>>>>>>>', msg)
  // });

    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const currentRole = useSelector(selectUserRole)
    const SERVER = "http://127.0.0.1:8080";
    const [adminNotifications, setAdminNotifications] = useState('')
    var socket = socketClient (SERVER);
    console.log('token ngoaif', token)
    useEffect(() => {
      console.log('token trong', token)
      dispatch(checkAccessToken(token))
    }, [dispatch, token]);

    useEffect(() => {
      if (currentRole === 1) {
        socket.on('notification', noti => {
          console.log('>>>>>>>>>>>>>>>>>>goosd', noti)
        });
      }
    },[])

    // useEffect(() => {
    //   dispatch(getAllNotifications({currentRole}))
    // },[])
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
                <Route path="requests">
                  <Route index element={<RequestPage />} />
                  <Route path=':id' element={<RequestDetail />} />
                  <Route path='add' element={<AddRequest />} />
                </Route>
                <Route path="reports">
                  <Route index element={<ReportPage />} />
                  <Route path=':id' element={<ReportDetail />} />
                  <Route path='add' element={<AddReport />} />
                </Route>
                <Route path="news">
                  <Route index element={<News />} />
                  <Route path=':id' element={<NewsDetail />} />
                  <Route path=':id/edit' element={<EditNews />} />
                  <Route path='add' element={<AddNew />} /> 
                </Route>
                <Route path="statistic">
                  <Route index element={<StatisticPage />} />
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

