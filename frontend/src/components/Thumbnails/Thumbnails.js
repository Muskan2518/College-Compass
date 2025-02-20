import React from 'react';
import { useBookmark } from '../hooks/useBookmark';
import { Link } from 'react-router-dom';
import classes from './thumbnails.module.css';
import StarRating from '../starrating/StarRating';
import Price from '../Price/Price';

export default function Thumbnails({ colleges }) {
  const { cart, addItem, removeItem } = useBookmark();

  const toggleBookmark = (college) => {
    if (cart?.items.some(item => item._id === college._id)) {
      removeItem(college._id);
    } else {
      addItem(college);
    }
  };

  return (
    <ul className={classes.list}>
      {colleges.map((college) => (
        <li key={college._id} className={classes.item}>
          <Link to={`/college/${college._id}`}>
            <img
              className={classes.image}
              src={`${college.imageUrl}`}
              alt={college.name}
            />
          </Link>
          <div className={classes.content}>
            <div className={classes.name}>{college.name}</div>
            <div className={classes.info}>
              <span
                className={`${classes.favorite} ${
                  cart?.items.some(item => item._id === college._id)
                    ? classes.isFavorite
                    : classes.notFavorite
                }`}
                onClick={() => toggleBookmark(college)}
              >
                <i className="fas fa-bookmark"></i>
              </span>
              <div className={classes.stars}>
                <StarRating stars={college.rating || 0} /> {/* Default to 0 stars if rating is null/undefined */}
              </div>
            </div>
            <div className={classes.product_item_footer}>
              <div className={classes.origin}>
                <span>{college.establishedYear || 'N/A'}</span> {/* Default to 'N/A' if establishedYear is null/undefined */}
              </div>
            </div>
            <div className={classes.location}>
              <div className={classes.origin}>
                <span>{college.location || 'Location not available'}</span> {/* Default message if location is null/undefined */}
              </div>
            </div>
            <div className={classes.price}>
              <Price price={college.fees || 0} /> {/* Default to 0 fees if fees is null/undefined */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
