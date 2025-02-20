import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Search.module.css';

export default function Search() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  const search = async () => {
    if (term.trim() !== '') {
      navigate(`/search/${term}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={classes.searchContainer}>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Enter search term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}
