import { useState } from 'react';
import './App.css';

const cardImages = [
    { src: '/img/hemlmet-1.png' },
    { src: '/img/potion-1.png' },
    { src: '/img/ring-1.png' },
    { src: '/img/scroll-1.png' },
    { src: '/img/shield-1.png' },
    { src: '/img/sword-1.png' },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);

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
    };

    console.log(cards, turns);

    return (
        <div className="App">
            <h1>Matchic</h1>
            <button onClick={shuffleCards}>New Game</button>
        </div>
    );
}

export default App;
