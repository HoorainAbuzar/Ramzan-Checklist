import React from "react";
// import MainPage from './components/MainPage.jsx'
import Checklist from "./components/CheckList.jsx";
import Dua from "./components/Dua.jsx";

import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/dua"} element={<Dua />} />
        <Route path={"/checklist"} element={<Checklist />} />
      </Routes>
    </div>
  );
}

export default App;
