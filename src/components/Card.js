import React, { useState } from 'react';

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
    <div className="card">
      {isEditing ? (
        <div className="card-details-edit">
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            required
          />
          <textarea value={editedDescription} onChange={handleDescriptionChange} />
          <div className="card-actions">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="card-details">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <div className="card-actions">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
