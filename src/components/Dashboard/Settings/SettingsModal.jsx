import React from 'react';
import { FaTimes } from 'react-icons/fa';

function SettingsModal({ isOpen, onRequestClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onRequestClose}></div>
      <div className="bg-[#27282B] p-6 rounded-lg relative w-1/2 h-1/2 flex flex-col items-center justify-center space-y-4">
        <button className="absolute top-2 right-2 text-white" onClick={onRequestClose}>
          <FaTimes />
        </button>
        <h2 className="text-center text-white">INDSTILLINGER</h2>
        <div className="flex items-center justify-center space-x-4">
  <span className="text-white">MOMS</span>
  <label className="switch">
    <input type="checkbox" />
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
  <select className="form-select mt-4 block w-full bg-[#201E1E] text-white custom-select">
    <option value="region1">DK1</option>
    <option value="region2">DK2</option>
  </select>
</div>
      </div>
    </div>
  );
}

export default SettingsModal;