// React
import React from 'react';
// Styling
import './App.css';
// Component
import Game from './components/Game';


const App = () => {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Game />
    </div>
  );
}

export default App;
