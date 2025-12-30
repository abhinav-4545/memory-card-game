import {GameHeader} from './components/GameHeader.jsx'
import {Card} from './components/Card.jsx'
import './index.css'
import { use } from 'react';  
import { useEffect, useState } from 'react';

const cardValues = [
  "🌸", "🍡", "👘", "⛩️", "🍥", "☯", "🍜", "🥢","🌸", "🍡", "👘", "⛩️", "🍥", "☯", "🍜", "🥢"
];
function App() {
  const [cards, setCards] = useState([])
  const initializeGame = () => {
    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(finalCards)
  }
  useEffect(() => {
    initializeGame()
  }, [])
  const handleCardClick = (card) => {
    if(card.isFlipped || card.isMatched) return;
    //Update card state to flipped
    const newCards = cards.map((c) => {
      if(c.id === card.id) {
        return {...c, isFlipped: true}; // Flip the card
      }else {
        return c;
      }
    })
    setCards(newCards);
  }
  return (
    
    <>
      <div className="app">
        <GameHeader score={3} moves={5} />
        <div className="cards-grid">
          {cards.map((card) => 
            <Card card={card} />
          )}
        </div>
      </div>
      
    </>
  )
}

export default App
