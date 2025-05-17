import React from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from "../components/layout/Sidebar";
import { authStore } from "../store/Auth";


const SidebarLayout = () => (
  <>
    {authStore.isAuth && <Sidebar/>}
    <Outlet />
  </>
);

export default SidebarLayout;