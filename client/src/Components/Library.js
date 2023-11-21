import React, { useState, useEffect, useContext } from 'react';
import GameWidget from './GameWidget';
import { GamesContext } from '../App';
import styles from '../Styles/Library.css'

function Library() {

    const [games, setGames] = useContext(GamesContext)

    const [filterResults, setFilterResults] = useState([])

    const [query, setQuery] = useState('')

    useEffect(() => {
        setFilterResults(games)
    }, [games])

    useEffect(() => {
        if (query) {
            setFilterResults(games.filter((game) => game.name.toLowerCase().includes(query.toLowerCase())))
        } else {
            setFilterResults(games)
        }
    }, [query])

    return (
        <div className="LibraryWrapper">
            <div className="Library">
                {filterResults.map(e => {
                    return (
                        <GameWidget
                            guid={e.guid}
                            name={e.name}
                            art={e.art}
                            id={e.id}
                            key={e.id}
                        />
                    )
                })}
            </div>
            <div className="Sidebar">
                <input
                    className="Search-Input"
                    placeholder="Search by Title..."
                    type="Text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Library;