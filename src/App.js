import React, { Component } from 'react';
// import Welcome from './components/Welcome'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import News from './pages/news/News';
import Single from './pages/single/Single'
// add icon
import "./fontawesome.js"

import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/register/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count : 0,
      token : '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({count: prevState.count + 1}));
  }

  handleDownClick(e) {
    e.preventDefault();
    this.setState(prevState => ({count: prevState.count - 1}));
  }

  handleCheckToken(token) {
    this.setState({
      token: token,
    })
  }

  render() {
    // if(!this.state.token) {
    //   return (
    //     <div className="App">
    //       <Login onCheckToken={this.handleCheckToken}/>
    //     </div>
    //   )
    // }
    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path='login' element={<Login/>}></Route>
                <Route path='register' element={<Register/>}></Route>
                <Route path="users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                  <Route path="new" element={<News />} />
                </Route>
              </Route> 
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={<News  title="Add New Product" />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;

