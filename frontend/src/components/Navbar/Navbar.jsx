import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/Auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.auth)

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar-section">
      <Link to="/" className="navbar-logo">
        <img src={Logo} alt="logo" />
        <p>MyUploads</p>
      </Link>
      <div className="navbar-profile flex-center">
        <p>{userInfo?.username}</p>
        <TbLogout className="dropdown-icon" onClick={logoutHandler} />
      </div>
    </nav>
  );
};

export default Navbar;
