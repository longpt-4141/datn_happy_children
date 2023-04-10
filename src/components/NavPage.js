import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import ListCenters from '../pages/centers/list-centers/ListCenters';

export default class NavPage extends Component {
  render() {
    return (
        <React.Fragment>
        <section>
          <Routes>
          <Route path="/centers" element={<ListCenters />} />
          </Routes>
        </section>
      </React.Fragment>
    )
  }
}
