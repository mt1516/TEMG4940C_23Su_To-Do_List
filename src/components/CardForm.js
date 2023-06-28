import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

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
    if (title.trim() !== '') {
      const newCard = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        // list: 'todo',
        // order: 0,
      };
      onCreateCard(newCard);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Input
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <TextArea
        placeholder="Enter a description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <Button type="submit">
        Add to To Do
      </Button>
    </Form>
  );
};

export default CardForm;
