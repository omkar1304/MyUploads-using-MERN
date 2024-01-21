import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeRoute from "./Pages/PrivateRoute/HomeRoute";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import DownloadPage from './Pages/DownloadPage/DownloadPage'

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="" element={<HomeRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/download/:code" element={<DownloadPage />}/>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
