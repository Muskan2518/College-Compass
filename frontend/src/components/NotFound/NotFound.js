import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import classes from './NotFound.module.css'; // Import CSS module

export default function NotFound({ message }) {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Page Not Found</h2>
      <p className={classes.message}>{message || 'The page you are looking for does not exist.'}</p>
      <Link to="/" className={classes.button}>
        Go to Home Page
      </Link>
    </div>
  );
}
