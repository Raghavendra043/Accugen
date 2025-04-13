import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

import './App.css';


function App() {
  

  return (
    
    <div className="App">
      {/* <HomePage /> */}
      <Outlet></Outlet>
    </div>

  );
}

export default App;
