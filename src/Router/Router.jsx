import React from "react";
import { Route, Routes } from "react-router-dom";
import LinaerStepper from "../Components/LinearStepper";
import Login from "../Components/Login";
import NotFound from "../Components/NotFound";
import User from "../Components/User";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LinaerStepper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Router;
