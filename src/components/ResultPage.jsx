import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ResultPage.module.css';
import NotFound from './NotFound';

function ResultPage() {
  const { name } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setImageLoaded(false);

      try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
        const data = await response.json();

        if (data.count === 0) {
          setLoading(false); // Stop loading immediately if no character found
          return; // Exit early
        }

        const characterData = data.results[0];
        const characterId = characterData.url.split('/').filter(Boolean).pop();
        
        const filmPromises = characterData.films.map((filmUrl) => 
          fetch(filmUrl).then((res) => res.json())
        );

        const films = await Promise.all(filmPromises);

        // Preload the image
        const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        
        img.onload = () => {
          setCharacter({
            ...characterData,
            imageUrl,
            films: films.map((film) => film.title),
          });
          setImageLoaded(true);
        };

        img.onerror = () => {
          setCharacter({
            ...characterData,
            imageUrl: '/placeholder.jpg',
            films: films.map((film) => film.title),
          });
          setImageLoaded(true);
        };
      } catch (err) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [name]);

  // Show NotFound immediately if no character data is loading
  if (!loading && !character) {
    return <NotFound searchedName={name} />;
  }

  // Show loading until both data and image are ready
  if (loading || !imageLoaded) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Character Details
        </h1>
        <div className={styles.content}>
          <img 
            src={character.imageUrl}
            alt={character.name} 
            className={styles.characterImage}
          />
          <h2 className={styles.characterName}>{character.name}</h2>
          <div className={styles.characterDetails}>
            <p className={styles.characterInfo}>Height: {character.height} cm</p>
            <p className={styles.characterInfo}>Birth Year: {character.birth_year}</p>
            <p className={styles.characterInfo}>Movies: {character.films.join(', ')}</p>
          </div>
          <Link 
            to="/"
            className={styles.backButton}
          >
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResultPage; 