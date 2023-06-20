import React, { useState } from 'react';
import Card from './Card';
import CardForm from './CardForm';
import SearchBar from './SearchBar';

const Board = () => {
    const [cards, setCards] = useState([]);

    // Function to handle card creation
    const handleCreateCard = (newCard) => {
        setCards([...cards, newCard]);
    };

    // Function to handle card deletion
    const handleDeleteCard = (cardId) => {
        setCards(cards.filter((card) => card.id !== cardId));
    };

    // Function to handle card editing
    const handleEditCard = (editedCard) => {
        setCards(cards.map((card) => (card.id === editedCard.id ? editedCard : card)));
    };

    // Function to handle card movement between lists
    const handleMoveCard = (cardId, newList) => {
        setCards(
            cards.map((card) => {
                if (card.id === cardId) {
                    return { ...card, list: newList };
                }
                return card;
            })
        );
    };

    // Function to handle card reordering within a list
    const handleReorderCards = (list, newCardOrder) => {
        setCards(
            cards.map((card) => {
                if (card.list === list && newCardOrder.includes(card.id)) {
                    return { ...card, order: newCardOrder.indexOf(card.id) };
                }
                return card;
            })
        );
    };

    // Function to handle card search
    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            // If the search term is empty, display all cards
            setCards(cards);
        } else {
            // Filter the cards based on the search term and update the UI
            const filteredCards = cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setCards(filteredCards);
        }
    };
  

    return (
        <div className="board">
            <div className="top-bar">
                <h1 className="title">To-do List</h1>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="list_grid">
                <div className="list">
                    <h2>To Do</h2>
                    <CardForm onCreateCard={handleCreateCard} list="todo" />
                    {cards
                    .filter((card) => card.list === 'todo')
                    .map((card) => (
                        <Card
                        key={card.id}
                        card={card}
                        onDeleteCard={handleDeleteCard}
                        onEditCard={handleEditCard}
                        onMoveCard={handleMoveCard}
                        onReorderCards={handleReorderCards}
                        />
                    ))}
                </div>
                <div className="list">
                    <h2>In Progress</h2>
                    {cards
                    .filter((card) => card.list === 'inProgress')
                    .map((card) => (
                        <Card
                        key={card.id}
                        card={card}
                        onDeleteCard={handleDeleteCard}
                        onEditCard={handleEditCard}
                        onMoveCard={handleMoveCard}
                        onReorderCards={handleReorderCards}
                        />
                    ))}
                </div>
                <div className="list">
                    <h2>Archived</h2>
                    {cards
                    .filter((card) => card.list === 'archived')
                    .map((card) => (
                        <Card
                        key={card.id}
                        card={card}
                        onDeleteCard={handleDeleteCard}
                        onEditCard={handleEditCard}
                        onMoveCard={handleMoveCard}
                        onReorderCards={handleReorderCards}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Board;
