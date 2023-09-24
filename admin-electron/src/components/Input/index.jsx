import React from "react";

const Input = ({ onChange, label, placeholder,value, type = "text" }) => {
  return ( 
    <div className="flex flex-col text-secondary">
      <label>{label}</label>
      <input className="rounded-md p-3 border border-gray-300" value={value} type={type} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  )
}

export default Input;