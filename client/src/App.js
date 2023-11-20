import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WithNav from "./Components/WithNav";
import Gate from "./Components/Gate";
import Library from "./Components/Library";
import GamePage from "./Components/GamePage";

export const LoginContext = createContext()
export const GamesContext = createContext()

function App() {

  const [user, setUser] = useState('')
  const [games, setGames] =useState([])

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
        })
      }
    })

    fetch("/games").then((response) => {
      if (response.ok) {
        response.json().then((games) => {
          setGames(games)
        })
      }
    })
  }, [])

  return (
    <GamesContext.Provider value={[games, setGames]}>
      <LoginContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <div className="App">
            <Routes>

              <Route element={<WithNav/>}>
                <Route 
                  path="/"
                  element= {<Library/>}
                />
                <Route 
                  path="/game/:id"
                  element= {<GamePage/>}
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
    </GamesContext.Provider>
  );
}

//NEXT:
//add filter and sort to frontend (maybe actually do this after adding review model so you can sort by review amount and score)
//GIT

//add basic review model, serializers, and such, again, just indexing for now
//add seed data for reviews
//GIT

export default App;