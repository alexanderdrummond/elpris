import React, { useState } from 'react'
import NavBar from './components/Dashboard/Nav/NavBar'
import BodyLayout from './components/Dashboard/Layout/BodyLayout'
import Content from './components/Dashboard/Content/Content'

function App() {
  const [activeTab, setActiveTab] = useState('CurrentPrice')

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