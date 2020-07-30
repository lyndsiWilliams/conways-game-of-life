// React
import React from 'react';
// Component
import Rules from './Rules';
// Styling
import './Game.css';


// Size of one cell ((cellSize)px * (cellSize)px)
const cellSize = 20;


// The Cell component
class Cell extends React.Component {
    render() {
        // Bring in x and y position as props
        const { x, y } = this.props;
        
        return (
            <div 
                className="cell"
                // This sets the dimensions of the cell
                style={{
                    left: `${cellSize * x + 1}px`,
                    top: `${cellSize * y + 1}px`,
                    width: `${cellSize - 1}px`,
                    height: `${cellSize - 1}px`,
                }} />
        );
    }
}


// The Game component
class Game extends React.Component {
    // Set up the row/column sizes and
    // Create a new empty board
    constructor() {
        super();
        this.rows = this.state.height / cellSize;
        this.cols = this.state.width / cellSize;
        this.board = this.makeEmptyBoard();
    }

    // Set initial state
    state = {
        cells: [],
        interval: 100,
        isRunning: false,
        count: 0,
        // Width and height of game board
        width: 800,
        height: 600,
    }

    // ---------- Helper functions ----------

    // The board creator
    makeEmptyBoard() {
        let board = [];
        
        // Outer loop goes through the rows
        for (let y = 0; y < this.rows; y++) {
            // Set each row to an empty array
            board[y] = [];
            
            // Inner loop goes through the columns
            for (let x = 0; x < this.cols; x++) {
                // This makes all the cells start off as "dead"
                board[y][x] = false;
            }
        }

        return board;
    }

    // Calculate the position of the board element
    getElementOffset() {
        // Returns the size of boardRef and its position relative to the viewport
        const rect = this.boardRef.getBoundingClientRect();
        // Returns the documentElement of the document as an element
        const doc = document.documentElement;

        return {
            // Left of the element + pixels away from left of window - width of left border
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            // Right of the element + pixels away from top of the window - width of top border
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    // Create cells from this.board
    makeCells() {
        // Create an empty array for the cell to live in
        let cells = [];
        
        // Outer loop goes through the rows
        for (let y = 0; y < this.rows; y++) {
            // Inner loop goes through the columns
            for (let x = 0; x < this.cols; x++) {
                // If the board exists at that position...
                if (this.board[y][x]) {
                    // Place the cell at that position
                    cells.push({ x, y });
                }
            }
        }
        
        return cells;
    }

    // Event handler
    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        // x value of place clicked - board's x value
        const offsetX = event.clientX - elemOffset.x;
        // y value of place clicked - board's y value
        const offsetY = event.clientY - elemOffset.y;
        // Round down to remove the decimals from x and y 
        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        // If there isn't a cell at that position, place it
        // If there is already a cell at that position, remove it
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            // Toggle functionality
            this.board[y][x] = !this.board[y][x];
        }

        // Set the cell status to state
        this.setState({ cells: this.makeCells() });
    }

    // ---------- Game functionality ----------

    // Start the game!
    runGame = () => {
        this.setState({ isRunning: true });
        // Begin iterating
        this.runIteration();
    }

    // Stop the game
    stopGame = () => {
        this.setState({ isRunning: false });

        // If there is an active timeoutHandler...
        if (this.timeoutHandler) {
            // Clear the time
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    // Action!
    runIteration() {
        console.log('running iteration');
        // This allows change from the current board to the changed board
        let newBoard = this.makeEmptyBoard();

        // Outer loop goes through the rows
        for (let y = 0; y < this.rows; y++) {
            // Inner loop goes through the columns
            for (let x = 0; x < this.cols; x++) {
                // Calculate the current cell's neighbor's positions
                let neighbors = this.calculateNeighbors(this.board, x, y);
                // Check that a cell exists at this position
                if (this.board[y][x]) {
                    // If there are 2 or 3 neighbors to the current cell
                    if (neighbors === 2 || neighbors === 3) {
                        // Cell alive!
                        newBoard[y][x] = true;
                    } else {
                        // Cell dead
                        newBoard[y][x] = false;
                    }
                } else {
                    // If the cell is dead and it has 3 neighbors
                    if (!this.board[y][x] && neighbors === 3) {
                        // Cell alive!
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        // Set the old board to the newly-changed board
        this.board = newBoard;
        // Increase the iteration count
        this.state.count++;
        // Set the changed cells to state
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            // Run the iteration
            this.runIteration();
            // At this interval
        }, this.state.interval);
    }

    // Calculate the current cell's neighbor's positions
    calculateNeighbors(board, x, y) {
        // Start neighbors at 0
        let neighbors = 0;
        // Set an array of possible directions for cells to traverse
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        // Loop through the directions array
        for (let i = 0; i < dirs.length; i++) {
            // Check at the current iteration's direction
            const dir = dirs[i];
            // Set y1 to the current iteration's dir[0]
            let y1 = y + dir[0];
            // Set x1 to the current iteration's dir[1]
            let x1 = x + dir[1];

            // If there is a cell at the current (x1,y1) position, add to the neighbors count
            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }
    
    // ---------- Control helpers ----------

    handleIntervalChange = (event) => {
        // Set the interval to the new value input by user
        this.setState({ interval: event.target.value });
    }
    
    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
        this.setState({ count: 0 })
    }

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    smallerGrid = () => {
        this.setState({
            width: this.state.width/2,
            height: this.state.height/2
        });
    }

    largerGrid = () => {
        this.setState({
            width: this.state.width*2,
            height: this.state.height*2
        });
    }


    render() {
        // Bring in cell state
        const { cells } = this.state;

        return (
            <div>
                <div className="wrapper">
                    {/* The game board */}
                    <div
                        className="board"
                        style={{
                            width: this.state.width,
                            height: this.state.height,
                            // Sets the cell size
                            backgroundSize: `${cellSize}px ${cellSize}px`
                        }}
                        onClick={this.handleClick}
                        // Refs make it possible to access DOM nodes directly within React
                        // So you can manipulate a child of a component
                        ref={(n) => { this.boardRef = n; }}>

                        {/* Map through current state's cells and create a cell for each */}
                        {cells.map(cell => (
                            <Cell x={cell.x} y={cell.y}
                            key={`${cell.x},${cell.y}`}/>
                            ))}
                    </div>
                            
                    {/* Instructions and rules */}
                    <div className="rules">
                        <Rules />
                    </div>
                </div>

                <div className="controls">
                    <h4>This is generation {this.state.count}</h4>
                    {/* User input for interval */}
                    <h4>Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec</h4>
                    
                    {/* Stop/run button toggle */}
                    {this.state.isRunning ?
                        // If so, display 'Stop' button
                        <button className="button" onClick={this.stopGame}>Stop</button> :
                        // If not, display 'Run' button
                        <button className="button" onClick={this.runGame}>Run</button>
                    }

                    {/* Random button */}
                    <button className="button" onClick={this.handleRandom}>Random</button>

                    {/* Clear button */}
                    <button className="button" onClick={this.handleClear}>Clear</button>

                    {/* Size buttons */}
                    <button className="button" onClick={this.smallerGrid}>Smaller</button>
                    <button className="button" onClick={this.largerGrid}>Larger</button>
                </div>
            </div>
        );
    }
}

export default Game;