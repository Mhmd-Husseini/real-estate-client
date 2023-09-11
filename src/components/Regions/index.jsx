import React, { useState, useEffect } from 'react';
import beirut from '../../images/beirut.jpg'
import tyre from '../../images/tyre.jpg'
import keserwen from '../../images/keserwen.jpg'
import Jounieh from '../../images/junieh.jpg'
import Byblos from '../../images/byblos.jpg'
import Chouf from '../../images/chouf.jpg'
import Batroun from '../../images/batroun.jpg'

const Regions = () => {
  const regions = [
    {key:'1', name: 'Beirut', image: beirut},{key:'2', name: 'Jounieh', image: Jounieh},{key:'3', name: 'Chouf', image: Chouf},{key:'4', name: 'Batroun', image: Batroun},
    {key:'5', name: 'Keserwen', image: keserwen},{key:'6', name: 'Byblos', image: Byblos},{key:'7', name: 'Nabatieh', image: tyre},{key:'8', name: 'Saida', image: Batroun},{ key:'9', name: 'Tyre', image: Jounieh},
  ];

  const [visibleRegions, setVisibleRegions] = useState([0, 1, 2]);
  const [activeRoundedDiv, setActiveRoundedDiv] = useState(0); 

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 3;

      if (currentIndex >= regions.length) {
        currentIndex = 0;
      }

      setVisibleRegions([currentIndex, currentIndex + 1, currentIndex + 2]);
      setActiveRoundedDiv(currentIndex / 3);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-between">
      {visibleRegions.map((index) => (
        <div key={regions[index].key} className="card w-[29%] h-[31rem] bg-gray-200 relative overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-110">
          <p className="text-center text-lg font-bold mt-2 text-secondary">{regions[index].name}</p>
          <img src={regions[index].image} className="w-full h-[100%] object-cover" alt={regions[index].name} />
        </div>
      ))}
      <div className="w-full mt-4 text-center">
        {Array.from({ length: regions.length / 3 }, (_, i) => (
          <div key={i} className={`rounded-div inline-block w-4 h-4 m-2 ${activeRoundedDiv === i ? 'bg-secondary' : 'bg-primary'}`}>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;