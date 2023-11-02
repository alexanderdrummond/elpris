import React, { useState, useEffect } from 'react';

function SettingsTab({ isSwitchOn, setIsSwitchOn, setSelectedRegion, selectedRegion }) {

    useEffect(() => {
        localStorage.setItem('isSwitchOn', JSON.stringify(isSwitchOn));
        localStorage.setItem('selectedRegion', selectedRegion);
      }, [isSwitchOn, selectedRegion]);


  return (
    <div className="p-4 flex flex-col md:hidden">
      <h2 className="text-center text-white">INDSTILLINGER</h2>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-white">MOMS</span>
        <label className="switch">
        <input type="checkbox" checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-white">Notifikationer</span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-white">Vælg region</span>
        <select 
    className="form-select mt-4 block w-full bg-[#201E1E] text-white custom-select"
    value={selectedRegion}
    onChange={(e) => setSelectedRegion(e.target.value)}
  >
    <option value="DK1">DK1</option>
    <option value="DK2">DK2</option>
  </select>
      </div>
    </div>
  );
}

export default SettingsTab;