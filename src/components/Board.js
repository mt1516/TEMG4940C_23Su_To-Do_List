import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from './Card';
import CardForm from './CardForm';
import SearchBar from './SearchBar';

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #c8e1e9;
`;

const Title = styled.span`
  font-size: 2rem;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const List = styled.div`
  flex: 1 0 30%;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 0.9rem;
`;

const TitleTodo = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const TitleInProgress = styled.span`
  color: #f78055;
  background: rgba(255, 238, 170);
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const TitleArchived = styled.span`
  color: #cc0000;
  background: rgba(150, 12, 12, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const SpaceFiller = styled.div`
  margin-bottom: 1rem;
`;

const Board = () => {

    const [isSearching, setIsSearching] = useState(false);
    const [cards, setCards] = useState([[], [], []]);
    const [displayedCards, setDisplayedCards] = useState([[], [], []]);
    const [justDeleted, setJustDeleted] = useState(false);

    if (localStorage.getItem('cards') !== null) {
        if (!isSearching && displayedCards[0].length === 0 && displayedCards[1].length === 0 && displayedCards[2].length === 0 && !justDeleted) {
            setJustDeleted(false);
            setCards(JSON.parse(localStorage.getItem('cards')));
            setDisplayedCards(JSON.parse(localStorage.getItem('cards')));
        }
    }


    // Function to handle card creation
    const handleCreateCard = (newCard) => {
        const newCards = [[...cards[0], newCard], cards[1], cards[2]]
        setCards(newCards);
        handleStoreCards(newCards);
        setDisplayedCards(newCards);
    };

    // Function to handle card deletion
    const handleDeleteCard = (cardId) => {
        const newCards = cards.map((column) => {
            return column.filter((card) => card.id !== cardId);
        });
        setJustDeleted(true);
        setCards(newCards);
        handleStoreCards(newCards);
        setDisplayedCards(newCards);
    };

    // Function to handle card editing
    const handleEditCard = (editedCard) => {
        const newCards = cards.map((column) => {
            return column.map((card) => {return card.id === editedCard.id ? editedCard : card});
        });
        setCards(newCards);
        handleStoreCards(newCards);
        // if isSearching is true, we need to show only the updated card and already displaying cards
        if (isSearching) {
            const newDisplayedCards = displayedCards.map((column) => {
                return column.map((card) => {return card.id === editedCard.id ? editedCard : card});
            });
            setDisplayedCards(newDisplayedCards);
        } else {
            setDisplayedCards(newCards);
        }
    };

    // Function to handle card movement
    const handleMoveCard = (result) => {
        const { destination, source } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const columns = {
            'todo': 0,
            'inProgress': 1,
            'archived': 2,
        };

        // If the card is moved across columns
        if (source.droppableId !== destination.droppableId) {
            const sourceCards = cards[columns[source.droppableId]];
            const destinationCards = cards[columns[destination.droppableId]];
            const [movedCard] = sourceCards.splice(source.index, 1);
            destinationCards.splice(destination.index, 0, movedCard);
            if (source.droppableId === 'todo') {
                if (destination.droppableId === 'inProgress') {
                    setCards([sourceCards, destinationCards, cards[2]]);
                } else {
                    setCards([sourceCards, cards[1], destinationCards]);
                }
            } else if (source.droppableId === 'inProgress') {
                if (destination.droppableId === 'todo') {
                    setCards([destinationCards, sourceCards, cards[2]]);
                } else {
                    setCards([cards[0], sourceCards, destinationCards]);
                }
            } else {
                if (destination.droppableId === 'todo') {
                    setCards([destinationCards, cards[1], sourceCards]);
                } else {
                    setCards([cards[0], destinationCards, sourceCards]);
                }
            }
        } else {
            // If the card is moved within the same column
            const sourceCards = cards[columns[source.droppableId]];
            const [movedCard] = sourceCards.splice(source.index, 1);
            sourceCards.splice(destination.index, 0, movedCard);
            if (source.droppableId === 'todo') {
                setCards([sourceCards, cards[1], cards[2]]);
            } else if (source.droppableId === 'inProgress') {
                setCards([cards[0], sourceCards, cards[2]]);
            } else {
                setCards([cards[0], cards[1], sourceCards]);
            }
        }
        handleStoreCards(cards);
        setDisplayedCards(cards);
    };

    // Function to handle card search
    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setDisplayedCards(cards);
            setIsSearching(false);
        } else {
            setIsSearching(true);
            var newCards = []
            for (let i = 0; i < cards.length; i++){
                const filteredCards = cards[i].filter(
                    (card) =>
                        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        card.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
                newCards.push(filteredCards)
            }
            setDisplayedCards(newCards);
        }
    };

    // Function to store cards in local storage
    const handleStoreCards = (cardsToStore) => {
        localStorage.setItem('cards', JSON.stringify(cardsToStore));
    };

    return (
        <BoardContainer>
            <TopBar>
                <Title>
                    To-do List
                </Title>
                <SearchBar onSearch={handleSearch} />
            </TopBar>
            <ListGrid>
                <DragDropContext onDragEnd={handleMoveCard}>
                    <List>
                        <TitleTodo>
                            To Do
                        </TitleTodo>
                        <SpaceFiller></SpaceFiller>
                        {!isSearching && <CardForm onCreateCard={handleCreateCard} />}
                        <Droppable droppableId="todo">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {displayedCards[0]
                                        .map((card, index) => (
                                            <Draggable
                                                key={card.id}
                                                draggableId={card.id}
                                                index={index}
                                                isDragDisabled={isSearching}
                                                >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        key={card.id}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            card={card}
                                                            onDeleteCard={handleDeleteCard}
                                                            onEditCard={handleEditCard}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </List>
                    <List>
                        <TitleInProgress>
                            In Progress
                        </TitleInProgress>
                        <Droppable droppableId="inProgress">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {displayedCards[1]
                                        .map((card, index) => (
                                            <Draggable
                                                key={card.id}
                                                draggableId={card.id}
                                                index={index}
                                                isDragDisabled={isSearching}
                                                >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        key={card.id}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            card={card}
                                                            onDeleteCard={handleDeleteCard}
                                                            onEditCard={handleEditCard}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </List>
                    <List>
                        <TitleArchived>
                            Archived
                        </TitleArchived>
                        <Droppable droppableId="archived">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {displayedCards[2]
                                        .map((card, index) => (
                                            <Draggable
                                                key={card.id}
                                                draggableId={card.id}
                                                index={index}
                                                isDragDisabled={isSearching}
                                                >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        key={card.id}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            card={card}
                                                            onDeleteCard={handleDeleteCard}
                                                            onEditCard={handleEditCard}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </List>
                </DragDropContext>
            </ListGrid>
        </BoardContainer>
    );
};

export default Board;
