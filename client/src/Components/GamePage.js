import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext } from '../App';

function GamePage() {

    const [games, setGames] = useContext(GamesContext)

    const { id } = useParams()



    return (
        <div>{id}</div>
    )
}

export default GamePage;