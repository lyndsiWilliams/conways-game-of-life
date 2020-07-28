// React
import React from 'react';


const Cell = props => {
    const { x, y, cellSize } = props;

    return (
        <div
            className="cell"
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