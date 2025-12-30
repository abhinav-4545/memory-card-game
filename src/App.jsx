import {GameHeader} from './components/GameHeader.jsx'
import {Card} from './components/Card.jsx'
import './index.css'
import { use } from 'react';  
import { WinMessage } from './components/WinMessage.jsx';
import { useGameLogic } from './hooks/useGameLogic.js';
import React from 'react';
const cardValues = [
  "🌸", "🍡", "👘", "⛩️", "🍥", "☯", "🍜", "🥢","🌸", "🍡", "👘", "⛩️", "🍥", "☯", "🍜", "🥢"
];
function App() {
  const {cards, score, moves, handleCardClick, initializeGame, isGameComplete} = useGameLogic(cardValues);
  
  return (
    <>
      <div className="app">
        <GameHeader score={score} moves={moves} onReset={initializeGame} />
        {isGameComplete && <WinMessage moves={moves} score={score} onReset={initializeGame} />}
        <div className="cards-grid">
          {cards.map((card) => 
            <Card card={card} onClick={handleCardClick} />
          )}
        </div>
      </div>
      
    </>
  )
}

export default App
