import React, { useEffect, useState } from 'react';
import { fetchCurrentPrice } from '../../../utils/fetchPrice';

function History ({ isSwitchOn, selectedRegion }) {

  const [data, setData] = useState([]);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);
  

  useEffect(() => {
    const fetchData = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
  
      if (navigator.onLine) {
        fetchCurrentPrice(selectedRegion)
          .then(data => processData(data));
      } else {
        caches.open('api-cache').then(cache => {
          cache.match(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${selectedRegion}.json`)
            .then(response => {
              if (response) {
                response.json().then(data => processData(data));
              }
            });
        });
      }
    };
  
    const processData = (data) => {
      setData(data[selectedRegion]);
      const prices = data[selectedRegion].map(d => d.DKK_per_kWh);
      setLowestPrice(Math.min(...prices));
      setHighestPrice(Math.max(...prices));
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 60 * 60 * 1000); 
  
    return () => clearInterval(intervalId);
  }, [isSwitchOn, selectedRegion]);

  const minPrice = Math.min(...data.map(item => item.DKK_per_kWh));
  const maxPrice = Math.max(...data.map(item => item.DKK_per_kWh));

  function priceToColor(price) {
    const minColor = [0, 255, 0]; 
    const maxColor = [255, 0, 0]; 
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    const color = minColor.map((min, i) => Math.round(min + (maxColor[i] - min) * ratio));
    const hexColor = '#' + color.map(c => c.toString(16).padStart(2, '0')).join('');
    return hexColor;
  }

  

  return (
    <div className="p-4 md:block mt-10">
      <div className="md:hidden flex justify-center space-x-4 mb-10">
        {['LAVESTE PRIS', 'HØJESTE PRIS'].map((text, index) => (
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
      {data.map((item, index) => {
  const priceMultiplier = isSwitchOn ? 1.25 : 1;
  return (
    <div key={index} className="flex justify-between border-none rounded bg-[#201E1E] p-2 mb-2">
      <div className="ml-4 text-xs text-white mr-20">kl. {item.time_start.slice(11, 16)}</div>
      <div className="text-xs text-white mr-4" style={{color: priceToColor(item.DKK_per_kWh * priceMultiplier)}}>{(item.DKK_per_kWh * priceMultiplier).toFixed(4)} kr</div>
    </div>
  )
})}
    </div>
  );
}

export default History;