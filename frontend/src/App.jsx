import { useState } from "react";
import HomePage from "./pages/homePage/home";
import LoginPage from "./pages/loginPage/login";
import ProfilePage from "./pages/profilePage/profile";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
