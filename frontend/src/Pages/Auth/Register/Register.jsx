import React, { useState } from "react";
import "./register.css";
import Loader from "../../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCrendentials } from '../../../redux/features/Auth/authSlice'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return null;
    }

    try {
      const res = await register({ username, password }).unwrap();
      dispatch(setCrendentials({"username": res?.username}))
      toast.success("Registration was successful!");
      navigate("/")

    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  };

  return (
    <div className="register-section flex-center">
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="register-form">
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="register-input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="register-input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="register-input">
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit">Register</button>
          </form>

          <div className="login-box">
            <span>
              Already Registered?{" "}
              <Link to="/login" className="login-link">
                Login Now
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
