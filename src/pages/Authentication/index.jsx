import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const location = useLocation(); 
  const showSignUp = location.state?.showSignUp || false;

  const [login, setLogin] = useState(!showSignUp); 

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
