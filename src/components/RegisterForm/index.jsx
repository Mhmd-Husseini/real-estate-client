import React, { useState } from "react";
import Input from "../Input";
import ButtonSm from "../ButtonSm";
import { sendRequest } from "../../config/request";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = ({ onToggle }) => {
  const navigation = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const registerHandler = async () => {
    if (!credentials.name) {
      setError("Name is required");
      return;
    }

    if (!validateEmail(credentials.email)) {
      setError("Invalid Email Address");
      return;
    }

    if (!validatePassword(credentials.password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!credentials.phone) {
      setError("Phone is required");
      return;
    }

    try {
      const response = await sendRequest({
        method: "POST",
        route: "guest/register",
        body: credentials,
      });

      localStorage.setItem("access_token", response.token);

      navigation("/");
    } catch (error) {
      console.log(error);
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
          </Link>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input label="Name" placeholder="Enter your name" value={credentials.name} onChange={(name) => setCredentials({ ...credentials, name })} />
          <Input label="Email" placeholder="Enter your email" type="email" value={credentials.email} onChange={(email) => setCredentials({ ...credentials, email })} />
          <Input label="Password" placeholder="Enter your password" type="password" value={credentials.password} onChange={(password) => setCredentials({ ...credentials, password })} />
          <Input label="Phone" placeholder="Enter your phone number" value={credentials.phone} onChange={(phone) => setCredentials({ ...credentials, phone })} />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-center items-center">
            <ButtonSm onClick={registerHandler} buttonText="Signup" />
          </div>
        </form>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?{" "}
          <span className="cursor-pointer text-secondary font-semibold" onClick={() => onToggle()}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
