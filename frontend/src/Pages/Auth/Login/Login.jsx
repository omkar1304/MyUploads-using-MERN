import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCrendentials } from "../../../redux/features/Auth/authSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCrendentials({"username": res?.username}))
      toast.success("Login was successful!");
      navigate("/")

    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  };

  return (
    <div className="login-section flex-center">
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login-form">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="login-input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="register-box">
            <span>
              New User?{" "}
              <Link to="/register" className="register-link">
                Register Now
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
