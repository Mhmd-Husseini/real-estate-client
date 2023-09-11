import React, { useState } from "react";
import Input from "../Input";
import ButtonSm from "../ButtonSm";
import { sendRequest } from "../../config/request";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

const LoginForm = ({ onToggle }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginHandler = async () => {
    if (!validateEmail(credentials.email)) {
      setError("Invalid Email Address");
      return;
    }

    if (credentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await sendRequest({ method: "POST", route: "guest/login", body: credentials });
      dispatch(setToken(response.data.token));
      navigation("/");
    } catch (error) {
      console.log(error);
      setError("Incorrect Email/Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
            Lebanon RealEstate Insights
            </h2>
            <div className='w-36 h-1.5 bg-gradient-to-r from-primary to-black'>
            </div>
          </Link>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" placeholder="Enter your email" type="email" value={credentials.email} onChange={(email) => setCredentials({ ...credentials, email })}/>
          <Input label="Password" placeholder="Enter your password" type="password" value={credentials.password} onChange={(password) => setCredentials({ ...credentials, password })}/>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-center">
            <ButtonSm onClick={loginHandler} buttonText="Login"/>
          </div>
          <p className=" text-center text-gray-600">
          Don't have an account?{" "}
          <span className="cursor-pointer text-secondary font-semibold" onClick={() => onToggle()}>
            Register here
          </span>
        </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
