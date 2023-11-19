import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WithNav from "./Components/WithNav";
import Gate from "./Components/Gate";
import Library from "./Components/Library";

export const LoginContext = createContext()

function App() {

  const [user, setUser] = useState('')

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
        })
      }
    })
  }, [])

  return (
    <LoginContext.Provider value={[user, setUser]}>
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
    </LoginContext.Provider>
  );
}

export default App;