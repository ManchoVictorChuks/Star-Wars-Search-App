import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPage.module.css';

function SearchPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const characters = [
    "Darth Vader",
    "Luke Skywalker",
    "Leia Organa",
    "Han Solo",
    "Yoda",
    "Obi-Wan Kenobi",
    "Palpatine",
    "Kylo Ren",
    "Rey",
    "Chewbacca",
    "R2-D2",
    "C-3PO",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Find the first matching character
    const match = characters.find((char) =>
      char.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestion(match && value ? match : "");
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === "Tab") && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion(""); // Clear suggestion on selection
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/result/${input}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h1 className={styles.title}>
            <span className={styles.subtitle}>Character Search</span>
          </h1>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter a character name"
                className={styles.input}
              />
              {suggestion && input && suggestion !== input && (
                <div className={styles.suggestionWrapper}>
                  <span className={styles.suggestion}>
                    {input}{suggestion.slice(input.length)}
                  </span>
                </div>
              )}
              <button type="submit" className={styles.searchButton} aria-label="Search">
                <SearchIcon className={styles.searchIcon} />
              </button>
            </div>
          </form>
          <div className={styles.characterGrid}>
            <CharacterIcon name="Yoda" color="#2ecc71" />
            <CharacterIcon name="Darth Vader" color="#e74c3c" />
            <CharacterIcon name="R2-D2" color="#3498db" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CharacterIcon({ name, color }) {
  return (
    <div className={styles.characterIcon}>
      <div 
        className={styles.characterAvatar}
        style={{ backgroundColor: color }}
      >
        {name[0]}
      </div>
      <span className={styles.characterName}>{name}</span>
    </div>
  );
}

export default SearchPage; 