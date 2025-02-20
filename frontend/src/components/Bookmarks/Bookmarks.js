import React from 'react';
import { useBookmark } from '../hooks/useBookmark';// Adjust the path as necessary
import classes from './Bookmark.module.css';
import Title from '../Title/Title';

export default function Bookmarks() {
  const { cart, removeItem } = useBookmark();

  return (
    <>
      <Title title="Bookmarks" margin="1.5rem 0 0 2.5rem" />
      <div className={classes.bookmarksContainer}>
        {cart && cart.items.length > 0 ? (
          <ul className={classes.bookmarksList}>
            {cart.items.map((item) => (
              <li key={item.id} className={classes.bookmarkItem}>
                <img src={item.imageUrl} alt={item.name} className={classes.bookmarkImage} />
                <div className={classes.bookmarkContent}>
                  <h2 className={classes.bookmarkTitle}>{item.name}</h2>
                  <p className={classes.bookmarkDescription}>Location: {item.location}</p>
                  <p className={classes.bookmarkDescription}>Established: {item.establishedYear}</p>
                  <p className={classes.bookmarkDescription}>Student Count: {item.studentCount}</p>
                  <p className={classes.bookmarkDescription}>Rating: {item.rating} stars</p>
                  <p className={classes.bookmarkDescription}>Annual Fees: ₹{item.fees}</p>
                  <button 
                    className={classes.remove_button}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={classes.noBookmarks}>You have no bookmarks yet.</p>
        )}
      </div>
    </>
  );
}

