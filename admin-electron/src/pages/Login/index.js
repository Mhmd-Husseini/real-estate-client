import React, { useState } from "react";
import Input from "../../components/Input";
import ButtonSm from "../../components/ButtonSm";
import { sendRequest } from "../../config/request";
import { useNavigate } from "react-router-dom";

const Login = ( ) => {
  const navigation = useNavigate();
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
      const response = await sendRequest({ method: "POST", route: "/", body: credentials });
      localStorage.setItem('token',response.token);
      navigation("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Incorrect Email/Password");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center h- bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="mt-6 mb-1 text-3xl font-extrabold text-secondary">
            <div className="text-center mb-5">Admin Panel</div>
            <div>Lebanon Real Estate Insights</div>
            </h2>
            <div className='w-36 h-1.5 bg-gradient-to-r from-primary to-black'></div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" placeholder="Enter your email" type="email" value={credentials.email} onChange={(email) => setCredentials({ ...credentials, email })}/>
          <Input label="Password" placeholder="Enter your password" type="password" value={credentials.password} onChange={(password) => setCredentials({ ...credentials, password })}/>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-center">
            <ButtonSm onClick={loginHandler} buttonText="Login"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
