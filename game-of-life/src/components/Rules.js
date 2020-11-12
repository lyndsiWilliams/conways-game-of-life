// React
import React from 'react';


const Rules = () => {
  return (
    <div className="rules-wrapper">
      <div style={{ marginRight: "1%" }}>
        <h2>How to play:</h2>
        <section style={{ textAlign: "left" }}>
          • Click some squares (or the <span>Random button</span>) to populate the screen.<br/>
          • Set the <span>speed</span> of the game (in milliseconds)<br/>
          • Click the <span>Smaller/Larger buttons</span> to set the cell size.<br/>
          • Click the <span>Run button</span> to start the game!<br/>
          • Click the <span>Stop button</span> to stop the simulation.<br/>
          • Click the <span>Clear button</span> to reset the board.<br/>
        </section>
      </div>

      <div className="rules-section">
        <h2>Rules:</h2>
        <section style={{ textAlign: "left" }}>
          • If the cell is <span>alive</span> and has 2 or 3 neighbors, it remains <span>alive</span>. Otherwise it <span>dies</span>.<br/><br/>
          • If the cell is <span>dead</span> and has exactly 3 neighbors, then it comes to <span>life</span>.<br/>
        </section>
      </div>
    </div>
  );
};

export default Rules;