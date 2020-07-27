// React
import React from 'react';
// Styling
import './Game.css';

// Size of one cell
const cellSize = 20;
// Width and height of game board
const width = 800;
const height = 600;

const Game = () => {
    return (
        <div>
            {/* The game board */}
            <div
                className="board"
                style={{
                    width: width,
                    height: height,
                    backgroundSize: `${cellSize}px ${cellSize}px`
                }}
            />
        </div>
    );
};

export default Game;