import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { useLocation } from "react-router-dom"; // Import useLocation

const Authentication = () => {
  const location = useLocation(); // Use useLocation hook to access location state
  const showSignUp = location.state?.showSignUp || false; // Default to false if state is undefined

  const [login, setLogin] = useState(!showSignUp); // Initialize based on the showSignUp state

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {login ? (
        <LoginForm onToggle={() => setLogin(false)} />
      ) : (
        <RegisterForm onToggle={() => setLogin(true)} />
      )}
    </div>
  );
};

export default Authentication;
