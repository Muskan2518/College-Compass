import React from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ stars, size }) {
  const starStyles = {
    width: size + 'px',
    height: size + 'px',
    marginRight: size / 6 + 'px',
  };

  function Star({ number }) {
    const halfNumber = number - 0.5;
    if (stars >= number) {
      return <i className={`fas fa-star ${styles.star} ${styles['full-star']}`} style={starStyles} alt={number}></i>;
    } else if (stars >= halfNumber) {
      return <i className={`fas fa-star-half-alt ${styles.star} ${styles['half-star']}`} style={starStyles} alt={number}></i>;
    } else {
      return <i className={`far fa-star ${styles.star} ${styles['empty-star']}`} style={starStyles} alt={number}></i>;
    }
  }

  return (
    <div className={styles['star-rating']}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Star key={num} number={num} />
      ))}
    </div>
  );
}

StarRating.defaultProps = {
  size: 18,
};
