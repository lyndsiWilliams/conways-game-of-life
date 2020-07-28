// React
import React from 'react';


const Rules = () => {
    return (
        <div>
            <h2>How to play:</h2>
                <li>Click some squares (or the Random button) to populate the screen.</li>
                <li>Set the speed of the game in milliseconds</li> 
                <li>Click the Run button to start the game!</li>
                <li>Click the Stop button to stop the simulation.</li>
                <li>Click the Clear button to reset the board.</li>

            <h2>Rules:</h2>
                <li>If the cell is alive and has 2 or 3 neighbors, it remains alive. Otherwise it dies.</li>
                <li>If the cell is dead and has exactly 3 neighbors, then it comes to life.</li>

        </div>
    )
}

export default Rules;