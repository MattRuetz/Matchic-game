import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const cardImages = [
    { src: '/img/helmet-1.png', matched: false },
    { src: '/img/potion-1.png', matched: false },
    { src: '/img/ring-1.png', matched: false },
    { src: '/img/scroll-1.png', matched: false },
    { src: '/img/shield-1.png', matched: false },
    { src: '/img/sword-1.png', matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [chosenTwo, setChosenTwo] = useState({
        firstCard: null,
        secondCard: null,
    });
    const [disabled, setDisabled] = useState(false);

    // shuffle array with 2 of each card type
    const shuffleCards = () => {
        // put two copies of cardImages array in for 2 of each type
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(
                () => Math.random() - 0.5 //shuffle
            )
            .map((card) => ({ ...card, id: Math.random() })); //attach rand ID to each card

        setCards(shuffledCards);
        setTurns(0);
        resetTurn();
    };

    // handle user selecting a card
    const handleChoice = (card) => {
        chosenTwo.firstCard !== null
            ? setChosenTwo({ firstCard: chosenTwo.firstCard, secondCard: card })
            : setChosenTwo({ firstCard: card });
    };

    // Flip false match, reset chosenTwo state
    const resetTurn = () => {
        setChosenTwo({ firstCard: null, secondCard: null });
        // Enable user inputs again..
        setDisabled(false);
    };

    //Triggers when a card is chosen
    useEffect(() => {
        if (chosenTwo.firstCard && chosenTwo.secondCard) {
            setDisabled(true); //stop taking user inputs..

            // compare choices to see if match
            if (chosenTwo.firstCard.src === chosenTwo.secondCard.src) {
                //Update cards array to mark matched cards
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        // Apply matched: true to selected cards if they match
                        if (chosenTwo.firstCard.src === card.src) {
                            return { ...card, matched: true };
                        }
                        return card;
                    });
                });
                setTurns((prev) => prev + 1);
                resetTurn();
            } else {
                setTurns((prev) => prev + 1);

                setTimeout(() => resetTurn(), 500);
            }
        }
    }, [chosenTwo]);

    // On Load (component mount)
    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className="App">
            <h1>Matchic</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === chosenTwo.firstCard ||
                            card === chosenTwo.secondCard ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>

            <p className="turns">Turns: {turns}</p>
        </div>
    );
}

export default App;
