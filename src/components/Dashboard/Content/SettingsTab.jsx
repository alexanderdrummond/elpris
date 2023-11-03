import React, { useState, useEffect } from 'react';

function SettingsTab({ isSwitchOn, setIsSwitchOn, setSelectedRegion, selectedRegion }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('isSwitchOn', JSON.stringify(isSwitchOn));
    localStorage.setItem('selectedRegion', selectedRegion);
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [isSwitchOn, selectedRegion, notificationsEnabled]);

  useEffect(() => {
    if (notificationsEnabled) {
      if (!("Notification" in window)) {
        alert("Denne browser understøtter ikke notifikationer");
      } else if (Notification.permission === "granted") {
        setInterval(() => {
          var notification = new Notification("Den nuværende pris er: ");
        }, 3600000); 
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            setInterval(() => {
              var notification = new Notification("Den nuværende pris er: ");
            }, 3600000); 
          }
        });
      }
    }
  }, [notificationsEnabled]);

  const triggerNotification = () => {
    if (Notification.permission === "granted") {
      var notification = new Notification("dette er en test");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("dette er en test");
        }
      });
    }
  };

  return (
    <div className="p-4 flex flex-col md:hidden">
      <h2 className="text-center text-white mb-5">INDSTILLINGER</h2>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <span className="text-white">MOMS</span>
        <label className="switch">
          <input type="checkbox" checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <span className="text-white">Notifikationer</span>
        <label className="switch">
          <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
          <span className="slider round"></span>
        </label>
      </div>
      <button onClick={triggerNotification}>Test notifikation</button>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <span className="text-white">Vælg region</span>
        </div>
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