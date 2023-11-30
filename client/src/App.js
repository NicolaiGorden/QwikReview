import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WithNav from "./Components/WithNav";
import Gate from "./Components/Gate";
import Library from "./Components/Library";
import GamePage from "./Components/GamePage";
import ReviewPage from "./Components/ReviewPage";
import UsersPage from "./Components/UsersPage";

export const LoginContext = createContext()
export const GamesContext = createContext()
export const UsersContext = createContext()

function App() {

  const [user, setUser] = useState('')
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])

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

    fetch("/users").then((response) => {
      if (response.ok) {
        response.json().then((users) => {
          setUsers(users)
        })
      }
    })
  }, [])

  return (
    <UsersContext.Provider value={[users, setUsers]}>
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
                  <Route 
                    path="/review"
                    element= {<ReviewPage/>}
                  />
                  <Route 
                    path="/review/game/:id"
                    element= {<ReviewPage/>}
                  />
                  <Route 
                    path="/users/:id"
                    element= {<UsersPage/>}
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
    </UsersContext.Provider>
  );
}

export default App;