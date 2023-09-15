import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { sendRequest } from "../../config/request";
import { useSelector } from "react-redux";

const UserProperties = () => {
  const [properties, setProperties] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({ method: "GET", route: "user/userProperties", token });
        setProperties(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]); 

  return (
    <div className='mx-auto max-w-screen-lg'>
      <div className='flex justify-around flex-wrap'>
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
