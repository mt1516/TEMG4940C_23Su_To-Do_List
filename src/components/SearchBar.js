import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarInput = styled.input`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // Handle search term change and filter the cards based on the search term
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
