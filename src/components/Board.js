import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from './Card';
import CardForm from './CardForm';
import SearchBar from './SearchBar';

const Board = () => {
    const [cards, setCards] = useState([]);

    // Function to handle card creation
    const handleCreateCard = (newCard) => {
        // const cardList = cards.filter((card) => card.list === newCard.list);
        // newCard.order = cardList.length;
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

    // Function to handle card movement
    const handleMoveCard = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const movedCard = cards.find((card) => card.id === draggableId);
        const movedFrom = cards.filter((card) => card.list === source.droppableId);
        const movedTo = cards.filter((card) => card.list === destination.droppableId);
        const unaffectedCards = cards.filter((card) => card.list !== source.droppableId && card.list !== destination.droppableId);

        if (source.draggableId === destination.draggableId) {
            movedFrom.splice(source.index, 1);
            movedFrom.splice(Math.min(destination.index, 0), 0, movedCard);
        }
        // console.log(newCardOrder);
        // console.log(source.index);
        // console.log(destination.index);
        // if (destination.index > source.index) {
        //     newCardOrder.splice(destination.index, 0, movedCard);
        //     newCardOrder.splice(source.index, 1);
        // } else if (destination.index < source.index) {
        //     newCardOrder.splice(destination.index, 0, movedCard);
        //     newCardOrder.splice(source.index+1, 1);
        // }
        // movedCard.list = destination.droppableId;
        // console.log(newCardOrder);
        // setCards(newCardOrder);
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
                <DragDropContext onDragEnd={handleMoveCard}>
                <div className="list">
                    <h2>To Do</h2>
                    <CardForm onCreateCard={handleCreateCard} list="todo" />
                    {/* <DragDropContext onDragEnd={handleEnd}> */}
                        <Droppable droppableId="todo">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {cards
                                        .filter((card) => card.list === 'todo')
                                        .map((card, index) => (
                                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                                {/* {(provided, snapshot) => ( */}
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        key={card.id}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        // className={
                                                        //     snapshot.isDragging ? 'selected' : 'not-selected'
                                                        // }
                                                    >
                                                        <Card
                                                            key={card.id}
                                                            card={card}
                                                            onDeleteCard={handleDeleteCard}
                                                            onEditCard={handleEditCard}
                                                            onMoveCard={handleMoveCard}
                                                            // onReorderCards={handleReorderCards}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    {/* </DragDropContext> */}
                </div>
                <div className="list">
                    <h2>In Progress</h2>
                    {/* <DragDropContext onDragEnd={handleEnd}> */}
                        <Droppable droppableId="inProgress">
                            {(provided) => (
                                <div className="dropArea">
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {cards
                                        .filter((card) => card.list === 'inProgress')
                                        .map((card) => (
                                            <Draggable key={card.id} draggableId={card.id} index={card.order}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        key={card.id}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            key={card.id}
                                                            card={card}
                                                            onDeleteCard={handleDeleteCard}
                                                            onEditCard={handleEditCard}
                                                            onMoveCard={handleMoveCard}
                                                            // onReorderCards={handleReorderCards}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                                </div>
                            )}
                        </Droppable>
                    {/* </DragDropContext> */}
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
                        // onReorderCards={handleReorderCards}
                        />
                    ))}
                </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Board;
