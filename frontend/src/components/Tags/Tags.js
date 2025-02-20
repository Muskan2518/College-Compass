import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from "./tags.module.css";

export default function Tags({ tags = [], forFoodPage = false }) {
  return (
    <div 
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
      }}
    >
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFoodPage && ` (${tag.count})`}
        </Link>
      ))}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number
    })
  ).isRequired,
  forFoodPage: PropTypes.bool
};
