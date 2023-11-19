import React, { useState, useEffect } from 'react';
import GameWidget from './GameWidget';
import styles from '../Styles/Library.css'

function Library() {
    return (
        <div className="LibraryWrapper">
            <div className="Library">
                <GameWidget/>
            </div>
            <div className="Sidebar">
                
            </div>
        </div>
    )
}

export default Library;