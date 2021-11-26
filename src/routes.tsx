import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import HomeContainer from './pages/Home/home.container';

const Container = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />        
      </Routes>
    </Router>
  );
}

export default Container;
