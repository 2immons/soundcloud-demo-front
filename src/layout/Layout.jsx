import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../components/layout/Header";

const Layout = () => (
  <div className="page-container">
    <Header>SoundCloud Demo</Header>
    <div className="page-content">
      <Outlet />
    </div>
  </div>
);

export default Layout;