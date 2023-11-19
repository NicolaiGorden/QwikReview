import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WithNav from "./Components/WithNav";
import Gate from "./Components/Gate";
import Library from "./Components/Library";

function App() {

  const [user, setUser] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route element={<WithNav/>}>
            <Route 
              path="/"
              element= {<Library/>}
            />
          </Route>


          <Route 
            path="/gate"
            element= {<Gate/>}
          />
          <Route 
            path="/gate/:mode"
            element= {<Gate/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;