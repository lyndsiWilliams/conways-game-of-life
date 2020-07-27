// React
import React, { useState, useRef } from 'react';
// Component
// import Cell from './Cell';
// Styling
import './Game.css';


// Size of one cell ((cellSize)px * (cellSize)px)
const cellSize = 20;
// Width and height of game board
const width = 800;
const height = 600;

// const Game = () => {
//     // Setting local state
//     const [board, setBoard] = useState([]);
//     const [cells, setCells] = useState([]);
//     // Get reference to the board
//     var boardRef = useRef();

//     // Set some sizes
//     const rows = height / cellSize;
//     const columns = width / cellSize;
//     // const board = makeEmptyBoard();

//     // Make an empty board
//     const makeEmptyBoard = () => {
//         let board = [];

//         for (let y = 0; y < rows; y++) {
//             board[y] = [];

//             for (let x = 0; x < columns; x++) {
//                 board[y][x] = false;
//             }
//         }

//         return board;
//     }

//     // Create a cell
//     const makeCells = () => {
//         for (let y = 0; y < rows; y++) {
//             for (let x = 0; x < columns; x++) {
//                 if (board[y][x]) {
//                     cells.push({ x, y });
//                 }
//             }
//         }

//         return cells;
//     }

//     // Calculate the position of the board element
//     const getElementOffset = () => {
//         // Returns the size of boardRef and its position relative to the viewport
//         const rect = boardRef.getBoundingClientRect();  // boardRef?
//         // Returns the documentElement of the document as an element
//         const doc = document.documentElement;

//         return {
//             // Left of the element + pixels away from left of window - width of left border
//             x: (rect.left + window.pageXOffset) - doc.clientLeft,
//             // Right of the element + pixels away from top of the window - width of top border
//             y: (rect.top + window.pageYOffset) - doc.clientTop
//         }
//     }

//     // Event handler
//     const handleClick = (event) => {
//         const elemOffset = getElementOffset();
//         // x value of place clicked - board's x value
//         const offsetX = event.clientX - elemOffset.x;
//         // y value of place clicked - board's y value
//         const offsetY = event.clientY - elemOffset.y;
//         const x = Math.floor(offsetX / cellSize);
//         const y = Math.floor(offsetY / cellSize);

//         if (x >= 0 && x <= columns && y >= 0 && y <= rows) {
//             board[y][x] = !board[y][x]
//         }

//         // Make the cell at the clicked location
//         setCells({ cells: makeCells() });
//     }

//     return (
//         <div>
//             {/* The game board */}
//             <div
//                 className="board"
//                 style={{
//                     width: width,
//                     height: height,
//                     // Setting the cell size
//                     backgroundSize: `${cellSize}px ${cellSize}px`
//                 }}
//                 onClick={handleClick}
//                 // Refs make it possible to access DOM nodes directly within React
//                 // So you can manipulate a child of a component
//                 ref={(n) => { boardRef = n; }}
//             >
//                 {cells.map(cell => (
//                     <Cell
//                         x={cell.x}
//                         y={cell.y}
//                         cellSize={cellSize}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        
        return (
            <div 
                className="cell"
                style={{
                    left: `${cellSize * x + 1}px`,
                    top: `${cellSize * y + 1}px`,
                    width: `${cellSize - 1}px`,
                    height: `${cellSize - 1}px`,
                }} />
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.rows = height / cellSize;
        this.cols = width / cellSize;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
    }

    // Create an empty board
    makeEmptyBoard() {
        let board = [];
        
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    // Create cells from this.board
    makeCells() {
        let cells = [];
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        
        return cells;
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    runGame = () => {
        this.setState({ isRunning: true });
    }

    stopGame = () => {
        this.setState({ isRunning: false });
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }


    render() {
        const { cells } = this.state;

        return (
            <div>
                <div
                    className="board"
                    style={{
                        width: width,
                        height: height,
                        backgroundSize: `${cellSize}px ${cellSize}px`
                    }}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y}
                        key={`${cell.x},${cell.y}`}/>
                        ))}
                </div>

                <div className="controls">
                    Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                    
                    {this.state.isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> :
                        <button className="button" onClick={this.runGame}>Run</button>
                    }
                </div>
            </div>
        );
    }
}

export default Game;