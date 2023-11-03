import { FaCog } from 'react-icons/fa'
import CurrentPrice from './CurrentPrice'
import History from './History'
import Overview from './Overview'
import SettingsTab from './SettingsTab'
import React, { useState, useEffect } from 'react'

function Content({ activeTab, setActiveTab }) {
  const [isSwitchOn, setIsSwitchOn] = useState(
    JSON.parse(localStorage.getItem('isSwitchOn')) || false
  );
  const [selectedRegion, setSelectedRegion] = useState(
    localStorage.getItem('selectedRegion') || 'DK1'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsSwitchOn(JSON.parse(localStorage.getItem('isSwitchOn')) || false);
      setSelectedRegion(localStorage.getItem('selectedRegion') || 'DK1');
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="relative container mx-auto bg-[#27282B]">
      <FaCog className="text-[#55EC20] md:hidden absolute top-0 right-0" onClick={() => setActiveTab('Settings')} />
      <div className="mx-auto flex flex-wrap justify-center md:justify-between items-start md:space-x-4 max-w-screen-lg">
        <div className={`pundefined4 flex flex-col ${activeTab === 'CurrentPrice' ? 'block' : 'hidden'} md:block`}>
          <h2 className="text-white text-lg font-light mb-4 mt-8 text-center">ELPRISEN LIGE NU</h2>
          <CurrentPrice isSwitchOn={isSwitchOn} selectedRegion={selectedRegion}/>
        </div>
        <div className={`p-4 flex flex-col ${activeTab === 'History' ? 'block' : 'hidden'} md:block`}>
          <h2 className="text-white text-lg mb-4 mt-4 text-center">OVERSIGT</h2>
          <History isSwitchOn={isSwitchOn} selectedRegion={selectedRegion}/>
        </div>
        <div className={`p-4 flex flex-col ${activeTab === 'Overview' ? 'block' : 'hidden'} md:block`}>
          <h2 className="text-white text-lg mb-4 mt-4 text-center">HISTORIK</h2>
          <Overview isSwitchOn={isSwitchOn} selectedRegion={selectedRegion}/>
        </div>
        <div className={`p-4 flex flex-col ${activeTab === 'Settings' ? 'block' : 'hidden'} md:hidden`}>
  <SettingsTab isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} setSelectedRegion={setSelectedRegion} selectedRegion={selectedRegion} />
</div>
      </div>
    </div>
  )
}

export default Content