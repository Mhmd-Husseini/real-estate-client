import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ButtonSm = ({ buttonText, onClick }) => {
  return (
    <button onClick={() => onClick()} className="text-neutral-800 py-4 font-semibold px-5 rounded-tr-2xl bg-primary hover:bg-secondary hover:text-white text-sm whitespace-pre-wrap">
      {buttonText}   {buttonText === "Logout" ? <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> : <FontAwesomeIcon icon={faArrowRight} />}
    </button>
  )
}

export default ButtonSm