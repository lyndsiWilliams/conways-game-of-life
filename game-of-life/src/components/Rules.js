// React
import React from 'react';


const Rules = () => {
    return (
        <div>
            <h2>How to play:</h2>
                <li>Click some squares (or the <span>Random button</span>) to populate the screen.</li>
                <li>Set the <span>speed</span> of the game (in milliseconds)</li>
                <li>Click the <span>Smaller/Larger buttons</span> to set the cell size.</li>
                <li>Click the <span>Run button</span> to start the game!</li>
                <li>Click the <span>Stop button</span> to stop the simulation.</li>
                <li>Click the <span>Clear button</span> to reset the board.</li>

            <h2>Rules:</h2>
                <li>If the cell is <span>alive</span> and has 2 or 3 neighbors, it remains <span>alive</span>. Otherwise it <span>dies</span>.</li>
                <li>If the cell is <span>dead</span> and has exactly 3 neighbors, then it comes to <span>life</span>.</li>

        </div>
    )
}

export default Rules;