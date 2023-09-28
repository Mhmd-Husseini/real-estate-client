import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import ButtonSearch from '../../components/ButtonSearch';
import SearchDropDown from '../../components/SearchDropDown';
import { sendRequest } from "../../config/request";

const Properties = ({type}) => {
  const maxprice = [{ label: "Any", value: 40000000000 }, { label: "$100K", value: 100000 }, { label: "$150K", value: 150000 }, { label: "$200K", value: 200000 }, { label: "$250K", value: 250000 }, { label: "$300K", value: 300000 }, { label: "$350K", value: 350000 }];
  const minArea = [{ label: "Any", value: 0 }, { label: "200 sqft", value: 200 }, { label: "300 sqft", value: 300 }, { label: "400 sqft", value: 400 }, { label: "500 sqft", value: 500 }];
  const regionOptions = [{ label: "Any", value: "" },{ label: 'Beirut', value: 'Beirut' }, { label: 'Jounieh', value: 'Jounieh' }, { label: 'Chouf', value: 'Chouf' }, { label: 'Batroun', value: 'Batroun' }, { label: 'Keserwen', value: 'Keserwen' }, { label: 'Byblos', value: 'Byblos' }, { label: 'Nabatieh', value: 'Nabatieh' }, { label: 'Saida', value: 'Saida' }, { label: 'Tyre', value: 'Tyre' }];

  const [searchParams, setSearchParams] = useState({city_name: '', max_price: 40000000000, min_area: 0, type:{type} });
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({method: "GET",route: "guest/properties",params: { ...searchParams, page }});
        if (response.data.length === 0) {
          setHasMoreItems(false); 
        }
        if (page === 1) {
          setProperties(response.data);
        } else {
          setProperties([...properties, ...response.data]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams, page]);

  return (
    <div className='mx-auto max-w-screen-xl'>
      <div className='flex mt-12 items-end'>
        <div className='grow ml-7 h-1 bg-gradient-to-r from-primary to-black mb-7'></div>
        <ButtonSearch />
        <div className='grow h-1 mr-7 bg-gradient-to-r from-black to-primary mb-7'></div>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:gap-20 gap-4 items-center mt-5 md:m-8'>
        <SearchDropDown placeholder="City" options={regionOptions} onChange={(selectedOption) => setSearchParams({ ...searchParams, city_name: selectedOption }) }/>
        <SearchDropDown placeholder="Min Area" options={minArea} onChange={(selectedOption) => setSearchParams({ ...searchParams, min_area: selectedOption })}/>
        <SearchDropDown placeholder="Max Price" options={maxprice} onChange={(selectedOption) => setSearchParams({ ...searchParams, max_price: selectedOption })}/>
      </div>
      <div className='flex justify-around flex-wrap'>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
      <div className="text-center mt-4">
      {hasMoreItems ? (
        <button className="btn btn-primary text-primary font-bold text-md my-10" onClick={handleSeeMore}>
          See More
        </button>
      ) : (
        <p className="btn btn-primary text-primary font-bold text-md my-10">No more properties to show</p>
      )}
      </div>
      )}
    </div>
  );
};

export default Properties;
