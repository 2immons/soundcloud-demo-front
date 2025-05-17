import React from "react"
import { useNavigate } from "react-router";

import Header from "../components/layout/Header";
import Button from "../components/common/Button";

import "./PageNotFound.css";

const PageNotFound = () => {
  let navigate = useNavigate();

  return (
    <div className="page-container">
        <Header>SoundCloud Demo</Header>
        <div className="page-content page-content--404">
          <h1>404</h1>
          <h2>Страница не найдена</h2>
          <Button onClick={() => navigate("/")}>На главную</Button>
        </div>
    </ div>
  );
};

export default PageNotFound;