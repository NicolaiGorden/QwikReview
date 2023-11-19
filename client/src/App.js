import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WithNav from "./Components/WithNav";
import Gate from "./Components/Gate";
import Library from "./Components/Library";

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
//add basic game model, serializers, and such, just for indexing for now
//add seed data for games
//GIT

//load all games in app
//pass games to gamewidget components
//GIT

//add filter and sort to frontend
//GIT

//add page for individual games
//GIT

//add basic review model, serializers, and such, again, just indexing for now
//add seed data for reviews
//GIT

//add reviews to frontend
//GIT

export default App;