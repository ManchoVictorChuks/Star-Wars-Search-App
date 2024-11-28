import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = ({ searchedName }) => {
  // Capitalize first letter of each word
  const capitalizedName = searchedName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Character Not Found</h1>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <svg 
              className={styles.icon} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <p className={styles.errorTitle}>Oops! "{capitalizedName}" not found</p>
          <p className={styles.message}>
            The force is not strong with this one. We couldn't find the character you're looking for in our galaxy.
          </p>
          <p className={styles.subMessage}>
            Please check the name and try again, or search for a different character.
          </p>
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
};

export default NotFound; 