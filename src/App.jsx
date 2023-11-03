import React, { useState, useEffect } from 'react'
import NavBar from './components/Dashboard/Nav/NavBar'
import BodyLayout from './components/Dashboard/Layout/BodyLayout'
import Content from './components/Dashboard/Content/Content'

function App() {
  const [activeTab, setActiveTab] = useState('CurrentPrice')

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      <NavBar setActiveTab={setActiveTab} />
      <div className="bg-[#27282B]">
      <BodyLayout>
      <Content activeTab={activeTab} setActiveTab={setActiveTab} />
      </BodyLayout>
      </div>
    </div>
  )
}

export default App