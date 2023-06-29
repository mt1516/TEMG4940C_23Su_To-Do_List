import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarInput = styled.input`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  font-size: 1.2rem;
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <SearchBarInput
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
