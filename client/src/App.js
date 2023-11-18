import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route 
            path="/"
            element= {<h1>Library</h1>}
          />
          <Route 
            path="/testing"
            element= {<h1>test</h1>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;