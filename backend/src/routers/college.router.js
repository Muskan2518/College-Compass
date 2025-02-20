import { Router } from 'express';
import mongoose from 'mongoose';
import CollegeModel from '../models/clg.model.js';
import handler from 'express-async-handler';

const router = Router();

const validateObjectId = (req, res, next) => {
  const { collegeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(collegeId)) {
    return res.status(400).json({ error: 'Invalid college ID' });
  }
  next();
};

// Route: GET /api/colleges
// Description: Fetch all colleges
router.get('/', handler(async (req, res) => {
  const colleges = await CollegeModel.find({});
  res.json(colleges);
}));

// Route: POST /api/colleges
// Description: Create a new college
router.post('/', handler(async (req, res) => {
  const {
    name,
    establishedYear,
    location,
    studentCount,
    isPublic,
    rating,
    imageUrl,
    imageUrl2,
    tags = [],
    fees,
    cutoffRanks,
    casteCategories = [],
  } = req.body;

  if (!name || !establishedYear || !location || !studentCount || !fees) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  const college = new CollegeModel({
    name,
    establishedYear,
    location,
    studentCount,
    public: isPublic,
    rating,
    imageUrl,
    imageUrl2,
    tags,
    fees,
    cutoffRanks,
    casteCategories,
  });

  await college.save();
  res.status(201).json(college);
}));

// Route: GET /api/colleges/:collegeId
// Description: Fetch a college by ID
router.get('/:collegeId', validateObjectId, handler(async (req, res) => {
  const { collegeId } = req.params;
  const college = await CollegeModel.findById(collegeId);

  if (!college) {
    return res.status(404).json({ error: 'College not found' });
  }

  res.json(college);
}));

// Route: PUT /api/colleges/:collegeId
// Description: Update a college by ID
router.put('/:collegeId', validateObjectId, handler(async (req, res) => {
  const { collegeId } = req.params;
  const updateFields = req.body;

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'At least one field must be updated' });
  }

  const updatedCollege = await CollegeModel.findByIdAndUpdate(collegeId, updateFields, { new: true });

  if (!updatedCollege) {
    return res.status(404).json({ error: 'College not found' });
  }

  res.json(updatedCollege);
}));

// Route: DELETE /api/colleges/:collegeId
// Description: Delete a college by ID
router.delete('/:collegeId', validateObjectId, handler(async (req, res) => {
  const { collegeId } = req.params;
  const deletedCollege = await CollegeModel.findByIdAndDelete(collegeId);

  if (!deletedCollege) {
    return res.status(404).json({ error: 'College not found' });
  }

  res.json({ message: 'College deleted successfully' });
}));

// Route: PUT /api/colleges/:collegeId/rating
// Description: Update a college's rating by ID
router.put('/:collegeId/rating', validateObjectId, handler(async (req, res) => {
  const { collegeId } = req.params;
  const { userId, rating } = req.body;

  console.log('Received rating update:', { collegeId, userId, rating });

  // Validate request body
  if (typeof rating !== 'number' || !userId) {
    return res.status(400).json({ error: 'Rating and userId are required' });
  }

  try {
    // Find the college by ID
    const college = await CollegeModel.findById(collegeId);
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    // Add new rating
    college.ratings.push({ userId: new mongoose.Types.ObjectId(userId), rating });

    // Calculate average rating
    const totalRatings = college.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRatings / college.ratings.length;

    // Save updated college
    college.rating = averageRating;
    await college.save();

    console.log('Updated college:', college);

    res.json(college);
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}));

// Route: POST /api/colleges/:collegeId/reviews
// Description: Add a review to a college
router.post('/:collegeId/reviews', validateObjectId, handler(async (req, res) => {
  const { collegeId } = req.params;
  const { userId, userName, review } = req.body;

  console.log('Received review:', { collegeId, userId, userName, review });

  // Validate request body
  if (!review || !userId || !userName) {
    return res.status(400).json({ error: 'Review, userId, and userName are required' });
  }

  try {
    const college = await CollegeModel.findById(collegeId);
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    // Add new review
    college.reviews.push({ userId: new mongoose.Types.ObjectId(userId), userName, review, createdAt: new Date() });

    // Save updated college
    await college.save();

    console.log('Updated college with new review:', college);

    res.status(201).json(college.reviews);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}));

// Route: GET /api/colleges/:collegeId/reviews
// Description: Fetch all reviews for a college
router.get('/:collegeId/reviews', validateObjectId, handler(async (req, res) => {
  const { collegeId } = req.params;

  try {
    const college = await CollegeModel.findById(collegeId).select('reviews');
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    res.json(college.reviews);
  } catch (error) {
    console.error(`Error fetching reviews for college ${collegeId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}));

// Route: GET /api/colleges/search/:searchTerm
// Description: Search colleges by name
router.get('/search/:searchTerm', handler(async (req, res) => {
  const { searchTerm } = req.params;
  const searchRegex = new RegExp(searchTerm, 'i');
  const colleges = await CollegeModel.find({ name: { $regex: searchRegex } });
  res.json(colleges);
}));

// Route: GET /api/colleges/tags
// Description: Fetch all tags from colleges
router.get('/tags', handler(async (req, res) => {
  const tags = await CollegeModel.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $project: { _id: 0, name: '$_id', count: '$count' } },
  ]).sort({ count: -1 });
  res.json(tags);
}));

// Route: GET /api/colleges/tags/:tag
// Description: Fetch colleges by tag
router.get('/tags/:tag', handler(async (req, res) => {
  const { tag } = req.params;
  const colleges = await CollegeModel.find({ tags: tag });
  res.json(colleges);
}));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
