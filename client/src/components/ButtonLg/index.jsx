import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ButtonLg = ({ buttonText, onClick }) => {
  return (
    <button  onClick={() => onClick()} className="text-neutral-800 py-6 px-10 font-semibold rounded-tr-2xl bg-primary hover:bg-secondary hover:text-white text-lg whitespace-pre-wrap">
        {buttonText}       <FontAwesomeIcon icon={faArrowRight} />
    </button>
  )
}

export default ButtonLg