import './Card.css';

function Card({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        !disabled && handleChoice(card);
    };

    return (
        <div className="card">
            <div className={flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="card front" />
                <img
                    onClick={handleClick}
                    className="back"
                    src="/img/cover.png"
                    alt="card back"
                />
            </div>
        </div>
    );
}

export default Card;
