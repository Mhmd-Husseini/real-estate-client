import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import ButtonSearch from '../../components/ButtonSearch';
import SearchDropDown from '../../components/SearchDropDown';
import axios from 'axios';

const Lands = () => {
  const maxprice = [{ label: "Any", value: 40000000000 }, { label: "$100K", value: 100000 }, { label: "$150K", value: 150000 }, { label: "$200K", value: 200000 }, { label: "$250K", value: 250000 }, { label: "$300K", value: 300000 }, { label: "$350K", value: 350000 }];
  const minArea = [{ label: "Any", value: 0 }, { label: "200 sqft", value: 200 }, { label: "300 sqft", value: 300 }, { label: "400 sqft", value: 400 }, { label: "500 sqft", value: 500 }];
  const regionOptions = [{ label: "Any", value: "" },{ label: 'Beirut', value: 'Beirut' }, { label: 'Jounieh', value: 'Jounieh' }, { label: 'Chouf', value: 'Chouf' }, { label: 'Batroun', value: 'Batroun' }, { label: 'Keserwen', value: 'Keserwen' }, { label: 'Byblos', value: 'Byblos' }, { label: 'Nabatieh', value: 'Nabatieh' }, { label: 'Saida', value: 'Saida' }, { label: 'Tyre', value: 'Tyre' }];

  const [searchParams, setSearchParams] = useState({city_name: '', max_price: 40000000000, min_area: 0, type:"home" });
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/guest/properties`, {
        params: searchParams,
      });
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  return (
    <div className='mx-auto max-w-screen-xl'>
      <div className='flex mt-12 items-end '>
        <div className='grow h-1 bg-gradient-to-r from-primary to-black mb-7'></div>
        <ButtonSearch />
        <div className='grow h-1 bg-gradient-to-r from-black to-primary mb-7'></div>
      </div>
      <div className='flex justify-center gap-20 m-8'>
        <SearchDropDown placeholder="City" options={regionOptions} onChange={(selectedOption) => setSearchParams({ ...searchParams, city_name: selectedOption }) }/>
        <SearchDropDown placeholder="Min Area" options={minArea} onChange={(selectedOption) => setSearchParams({ ...searchParams, min_area: selectedOption })}/>
        <SearchDropDown placeholder="Max Price" options={maxprice} onChange={(selectedOption) => setSearchParams({ ...searchParams, max_price: selectedOption })}/>
      </div>
      <div className='flex justify-around flex-wrap'>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Lands;
