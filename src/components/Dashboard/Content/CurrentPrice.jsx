import React, { useEffect, useState, useRef } from 'react';
import { fetchCurrentPrice } from '../../../utils/fetchPrice';

function CurrentPrice({ isSwitchOn, selectedRegion }) {
    const [price, setPrice] = useState(null);
    const [timeSlot, setTimeSlot] = useState(null);
    const [lowestPrice, setLowestPrice] = useState(null);
    const [highestPrice, setHighestPrice] = useState(null);

    const intervalIdRef = useRef(null);
  
    useEffect(() => {
      const fetchPrice = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
    
        if (navigator.onLine) {
          fetchCurrentPrice(selectedRegion)
            .then(data => processData(data));
        } else {
          caches.match(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${selectedRegion}.json`)
            .then(response => {
              if (response) {
                response.json().then(data => processData(data));
              }
            });
        }
      };
    
      const processData = (data) => {
        const currentHour = new Date().getHours();
        const currentData = data[selectedRegion].find(d => new Date(d.time_start).getHours() === currentHour);
        if (currentData) {
          setPrice(currentData.DKK_per_kWh);
          setTimeSlot(`${currentData.time_start.slice(11, 16)} - ${currentData.time_end.slice(11, 16)}`);
        }
    
        const prices = data[selectedRegion].map(d => d.DKK_per_kWh);
        setLowestPrice(Math.min(...prices));
        setHighestPrice(Math.max(...prices));
      };
    
      fetchPrice();
    
      const now = new Date();
      const delayUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;
    
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(fetchPrice, 60 * 60 * 1000);
        intervalIdRef.current = intervalId;
      }, delayUntilNextHour);
    
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalIdRef.current);
      };
    }, [isSwitchOn, selectedRegion]);

  return (
    <div className="p-4 mt-20 md:block">
      <div className="flex justify-center">
        <div className="w-64 h-64 rounded-full border-1 border-white shadow-lg bg-[#201E1E] flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border-2 border-dashed border-[#55EC20] bg-[#201E1E] flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#55EC20] flex flex-col items-center justify-center">
            <span className="text-white text-md">
    {price ? `${(isSwitchOn ? price * 1.25 : price).toFixed(4)} KR` : 'Loading...'}
  </span>
              <span className="text-white text-xs">PR. KWH</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-white">{timeSlot || 'Loading...'}</div>
      <div className="hidden md:flex justify-center mt-10 space-x-4">
        {['laveste pris', 'højeste pris'].map((text, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-1 border-white shadow-lg bg-[#201E1E] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#55EC20] flex flex-col items-center justify-center">
              <span className="text-white text-md">
    {index === 0 
      ? (lowestPrice 
          ? `${(isSwitchOn ? lowestPrice * 1.25 : lowestPrice).toFixed(4)} KR` 
          : 'Loading...') 
      : (highestPrice 
          ? `${(isSwitchOn ? highestPrice * 1.25 : highestPrice).toFixed(4)} KR` 
          : 'Loading...')}
  </span>
                <span className="text-white text-xs">PR. KWH</span>
              </div>
            </div>
            <div className="mt-2 text-white text-sm">{text}</div>
          </div>
        ))}
      </div>
        <div className="hidden mt-20 md:flex justify-center mt-4 text-white text-xs">
          <div className="text-center">
            ALLE PRISER ER EKSL. MOMS OG AFGIFTER.
            <br /><br />
            DU VISES LIGE NU PRISERNE FOR REGION <br />ØST DANMARK
          </div>
        </div>
      </div>
    )
}

export default CurrentPrice