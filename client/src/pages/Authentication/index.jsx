import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { useLocation } from "react-router-dom";
import GoogleSignIn from "../../components/GoogleSignIn";

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
      <div className="flex flex-col items-center gap-3 mt-3 font-bold text-secondary">
        <p>Or</p> 
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default Authentication;
