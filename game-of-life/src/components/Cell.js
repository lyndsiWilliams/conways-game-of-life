// React
import React from 'react';


const Cell = props => {
    // Bring in x and y position and cellSize as props
    const { x, y, cellSize } = props;

    return (
        <div
            className="cell"
            // This sets the dimensions of the cell
            style={{
                left: `${cellSize * x + 1}px`,
                top: `${cellSize * y + 1}px`,
                width: `${cellSize - 1}px`,
                height: `${cellSize - 1}px`,
            }}
        />
    );
};

export default Cell;