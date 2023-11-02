import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { fetchPriceForDate } from '../../../utils/fetchPrice';
import 'react-datepicker/dist/react-datepicker.css';

function CustomInput({ value, onClick }) {
  return (
    <div className="flex justify-between border-none rounded bg-[#201E1E] p-2 mb-2" onClick={onClick}>
      <div className="text-white mr-36">{value}</div>
      <div className="text-green-500">
        <img className="w-5" src="/calendar.svg" />
      </div>
    </div>
  );
}

function Overview({ isSwitchOn, selectedRegion }) {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPriceForDate(selectedDate, selectedRegion).then(data => {
      setData(data.DK1);
      setLoading(false);
    });
  }, [selectedDate, selectedRegion]);


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
    <div className="p-4 md:block">
      <div className="mb-5 mt-5">
      <DatePicker 
  selected={selectedDate} 
  onChange={date => setSelectedDate(date)} 
  maxDate={new Date()}
  customInput={<CustomInput />}
/>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.map((item, index) => (
          <div key={index} className="flex justify-between border-none rounded bg-[#201E1E] p-2 mb-2">
            <div className="ml-4 text-xs text-white mr-20">kl. {item.time_start.slice(11, 16)}</div>
            <div className="text-xs text-white mr-4" style={{color: priceToColor(item.DKK_per_kWh)}}>
    {(isSwitchOn ? item.DKK_per_kWh * 1.25 : item.DKK_per_kWh).toFixed(4)} kr
  </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Overview;