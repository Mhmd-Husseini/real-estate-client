import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { sendRequest } from "../../config/request";

const UserProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({ method: "GET", route: "user/userProperties" });
        setProperties(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div className='mx-auto max-w-screen-lg'>
      <div className='flex justify-around gap-12 flex-wrap'>
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
