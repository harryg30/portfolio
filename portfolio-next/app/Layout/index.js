import Sidebar from '../../components/Sidebar'
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
      <main>{children}</main>
      </div>
    </div>
  )
}

