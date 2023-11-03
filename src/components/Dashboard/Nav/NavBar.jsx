import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { IconContext } from "react-icons";
import SettingsModal from '../Settings/SettingsModal';

function NavBar({ setActiveTab, activeTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <IconContext.Provider value={{ color: "#55EC20", className: "global-class-name" }}>
      <nav className="bg-[#201E1E] flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="/Icon.svg" alt="logo" className="w-6 h-6 mr-2" />
          <h1 className="text-[#55EC20] hidden md:block">Elprisen.nu</h1>
        </div>
        <div className="md:hidden flex items-center">
  <a href="#" className={`text-sm mr-3 ${activeTab === 'CurrentPrice' ? 'text-elprisGreen' : 'text-white'}`} onClick={(e) => {e.preventDefault(); setActiveTab('CurrentPrice')}}>LIGE NU</a>
  <a href="#" className={`text-sm mr-3 ${activeTab === 'History' ? 'text-elprisGreen' : 'text-white'}`} onClick={(e) => {e.preventDefault(); setActiveTab('History')}}>OVERSIGT</a>
  <a href="#" className={`text-sm ${activeTab === 'Overview' ? 'text-elprisGreen' : 'text-white'}`} onClick={(e) => {e.preventDefault(); setActiveTab('Overview')}}>HISTORIK</a>
</div>
        <div className="hidden md:flex items-center">
        <FaCog className="text-[#55EC20]" onClick={openModal} />
      </div>
      <SettingsModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </nav>
    </IconContext.Provider>
  )
}

export default NavBar