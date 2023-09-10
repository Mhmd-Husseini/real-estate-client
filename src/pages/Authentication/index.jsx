import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const Authentication = () => {
  const [login, setLogin] = useState(true);

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
