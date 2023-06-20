import React, { useState } from 'react';

const CardForm = ({ onCreateCard, list }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (list === 'todo' && title.trim() !== '') {
      const newCard = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        list: 'todo',
        order: 0,
      };
      onCreateCard(newCard);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="card-form">
      <input
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <textarea
        placeholder="Enter a description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit">Add to To Do</button>
    </form>
  );
};

export default CardForm;
