import { useEffect, useState } from 'react';
export const useGameLogic = (cardsValues) => {
  const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score , setScore] = useState(0);
    const [moves , setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const initializeGame = () => {
        // get previous theme from localStorage and apply it
  const isPurple = localStorage.getItem("theme") === "purple";

  // toggle theme
  if (isPurple) {
    document.body.classList.remove("purple-theme");
    localStorage.setItem("theme", "pink");
  } else {
    document.body.classList.add("purple-theme");
    localStorage.setItem("theme", "purple");
  }
  const shuffledValues = [...cardsValues].sort(() => Math.random() - 0.5);

  const finalCards = shuffledValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));

  setCards(finalCards);
  setIsLocked(false);
  setMoves(0);
  setScore(0);
  setMatchedCards([]);
  setFlippedCards([]);
};

    useEffect(() => {
      initializeGame()
    }, [])
    const handleCardClick = (card) => {
      if(card.isFlipped || card.isMatched || isLocked || flippedCards.length===2) return;
      //Update card state to flipped
      const newCards = cards.map((c) => {
        if(c.id === card.id) {
          return {...c, isFlipped: true}; // Flip the card
        }else {
          return c;
        }
      })
      setCards(newCards);
      const newFlippedCards = [...flippedCards, card.id];
      setFlippedCards(newFlippedCards);
      //Check for match if two cards are flipped
      if(flippedCards.length === 1) {
        setIsLocked(true);
        const firstCard = cards[flippedCards[0]];
  
        if(firstCard.value === card.value) {
          setScore((prev) => prev + 1);
          //It's a match
          setTimeout(() => {
          setMatchedCards((prev) => [...prev,firstCard.id,card.id])
  
      setCards((prev) => prev.map((c) => {
        if(c.id === card.id || c.id === firstCard.id) {
          return {...c, isMatched: true}; // Flip the card
        }else {
          return c;
        }
      }));
      setFlippedCards([]);
      setIsLocked(false);
          }, 200); 
        }else{
          //flip back card1 , card 2
          setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if(c.id === firstCard.id || c.id === card.id) {
              return {...c, isFlipped: false};
            }else {
              return c;
            }
        });
  
        setCards(flippedBackCards);
        setFlippedCards([]);
        setIsLocked(false);
        }, 800);
        }
        setMoves((prev) => prev + 1);
      }
    }
    const isGameComplete = matchedCards.length === cards.length && cards.length > 0;
    return {
      cards,
      score,
        moves,
        handleCardClick,
        initializeGame,
        isGameComplete
    }
}
