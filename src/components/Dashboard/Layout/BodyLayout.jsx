import React from "react"

function BodyLayout({ children }) {
    return (
      <div className="min-h-screen p-4">
        {children}
      </div>
    )
}
  
export default BodyLayout