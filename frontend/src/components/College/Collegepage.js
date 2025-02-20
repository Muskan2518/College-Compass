import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAll, updateCollegeRating, addCollegeReview, getCollegeReviews } from '../../services/clgService';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import classes from './Collegepage.module.css';
import Price from '../Price/Price';

const CollegePage = () => {
  const { collegeId } = useParams();
  console.log("College ID from URL:", collegeId); // Debugging log

  const [college, setCollege] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  console.log("User object from useAuth:", user); // Debugging log

  useEffect(() => {
    if (!collegeId) {
      console.error('No collegeId provided');
      return;
    }

    const fetchCollege = async () => {
      try {
        const colleges = await getAll();
        const selectedCollege = colleges.find(col => col._id === collegeId);
        if (selectedCollege) {
          console.log('Selected college:', selectedCollege); // Debugging log
          setCollege(selectedCollege);
          setNewRating(selectedCollege.rating);
        } else {
          console.error('College not found');
        }
      } catch (error) {
        console.error('Error fetching college:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviews = await getCollegeReviews(collegeId);
        console.log('Fetched reviews:', reviews); // Debugging log
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchCollege();
    fetchReviews();
  }, [collegeId]);

  const handleRatingChange = (event) => {
    setNewRating(parseInt(event.target.value, 10));
  };

  const handleRateSubmit = async (event) => {
    event.preventDefault();

    if (!user || !user.id) {
      console.error('User is not logged in or user id is undefined');
      return;
    }

    try {
      console.log("Submitting rating:", { collegeId, userId: user.id, rating: newRating }); // Debugging log
      await updateCollegeRating(collegeId, user.id, newRating);
      setCollege({ ...college, rating: newRating });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!user || !user.id || !user.name) {
      console.error('User is not logged in or user id/name is undefined');
      return;
    }

    try {
      console.log("Submitting review:", { collegeId, userId: user.id, userName: user.name, review }); // Debugging log
      const response = await addCollegeReview(collegeId, user.id, user.name, review);
      console.log('Review submitted:', response); // Debugging log
      const updatedReviews = await getCollegeReviews(collegeId);
      console.log('Updated reviews after submission:', updatedReviews); // Debugging log
      setReviews(updatedReviews);
      setReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  if (!college) {
    return <div className={classes.loading}>Loading...</div>;
  }

  return (
    <div className={classes.collegePage}>
      <h1 className={classes.name}>{college.name}</h1>
      <p className={classes.detail}>Location: {college.location}</p>
      {college.rating && (
        <p className={classes.detail}>Rating: {college.rating.toFixed(1)}</p>
      )}
      <img className={classes.image} src={`/colleges/${college.imageUrl}`} alt={college.name} />

      <div className={classes.cutoffRanks}>
        <h3>Cutoff Ranks</h3>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Branch</th>
              <th>General</th>
              <th>OBC</th>
              <th>SC</th>
              <th>ST</th>
            </tr>
          </thead>
          <tbody>
            {college.cutoffRanks && Object.entries(college.cutoffRanks).map(([branch, ranks]) => (
              <tr key={branch}>
                <td>{branch}</td>
                <td>{ranks.General}</td>
                <td>{ranks.OBC}</td>
                <td>{ranks.SC}</td>
                <td>{ranks.ST}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleRateSubmit}>
        <label className={classes.detail}>
          Rate this college:
          <select value={newRating} onChange={handleRatingChange} className={classes.select}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button type="submit" className={classes.button}>Rate</button>
      </form>

      <div className={classes.details}>
        <p><strong>Established Year:</strong> {college.establishedYear}</p>
        <p><strong>Student Count:</strong> {college.studentCount}</p>
        <p><strong>Public/Private:</strong> {college.public ? 'Public' : 'Private'}</p>
        <p><strong>Annual Fees:</strong> <Price price={college.fees} /></p>
        <p><strong>Tags:</strong> {college.tags?.join(', ')}</p>
      </div>

      <div className={classes.reviews}>
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className={classes.review}>
              <p><strong>{review.userName}</strong></p>
              <p>{review.review}</p>
              <p><small>{new Date(review.createdAt).toLocaleDateString()}</small></p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={review}
          onChange={handleReviewChange}
          className={classes.textarea}
          placeholder="Write a review..."
        />
        <button type="submit" className={classes.button}>Submit Review</button>
      </form>
    </div>
  );
};

const CollegePageWithAuthProvider = () => (
  <AuthProvider>
    <CollegePage />
  </AuthProvider>
);

export default CollegePageWithAuthProvider;
