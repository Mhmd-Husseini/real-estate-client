import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ButtonSearch = () => {
  return (
    <button disabled className="text-neutral-800 py-3 font-semibold px-6 bg-primary hover:bg-secondary hover:text-white text-sm whitespace-pre-wrap">
      Search     <FontAwesomeIcon icon={faSearch} /> 
    </button>
  )
}

export default ButtonSearch
