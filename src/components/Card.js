import React, { useState } from 'react';
import styled from 'styled-components';

const CardView = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  margin-left: -2.3rem;
`;

const CardDetails = styled.div`
  text-align: left;
  margin-top: 1rem;
`;

const CardEditDetails = styled.div`
  text-align: left;
  margin-top: 1rem;
  input {
    font-size: 1.2rem;
    width: 100%;
  }
  textarea {
    font-size: 1rem;
    width: 100%;
    height: 5rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Card = ({ card, onDeleteCard, onEditCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description);

  const handleDelete = () => {
    onDeleteCard(card.id);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      const editedCard = {
        ...card,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
      };
      onEditCard(editedCard);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(card.title);
    setEditedDescription(card.description);
  };

  return (
    <CardView>
      {isEditing ? (
        <CardEditDetails>
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            required
          />
          <textarea value={editedDescription} onChange={handleDescriptionChange} />
          <CardActions>
            <Button className="save_button" onClick={handleSave}>
              Save
            </Button>
            <Button className="cancel_button" onClick={handleCancel}>
              Cancel
            </Button>
          </CardActions>
        </CardEditDetails>
      ) : (
        <CardDetails>
          <h3>
            {card.title}
          </h3>
          <p>
            {card.description}
          </p>
          <CardActions>
            <Button className="edit_button" onClick={handleEdit}>
              Edit
            </Button>
            <Button className="delete_button" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </CardDetails>
      )}
    </CardView>
  );
};

export default Card;
