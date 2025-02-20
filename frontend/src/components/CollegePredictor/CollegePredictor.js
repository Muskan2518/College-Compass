import React, { Component } from 'react';
import { getAll } from '../../services/clgService';
import Thumbnails from '../Thumbnails/Thumbnails';
import './CollegePredictor.css'; // Import CSS file

class CollegePredictor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankInput: '',
      caste: 'General', // Default caste
      category: 'CSE', // Default category
      filteredColleges: [],
      errorMessage: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      rankInput: e.target.value,
      errorMessage: '', // Clear error message when input changes
    });
  };

  handleCasteChange = (e) => {
    this.setState({
      caste: e.target.value,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { rankInput, caste, category } = this.state;

    // Convert input rank to number
    const inputRank = parseInt(rankInput, 10);

    // Validate input
    if (isNaN(inputRank) || inputRank <= 0) {
      this.setState({
        errorMessage: 'Please enter a valid rank.', // Display error for invalid input
        filteredColleges: [], // Clear colleges list on error
      });
      return;
    }

    try {
      // Fetch all colleges from the backend
      const allColleges = await getAll();

      // Filter colleges based on the input rank, caste, and selected category
      const filtered = allColleges.filter(college => inputRank <= college.cutoffRanks[category][caste]);

      this.setState({
        filteredColleges: filtered,
        errorMessage: '', // Clear error message if successful
      });
    } catch (error) {
      console.error('Error fetching colleges:', error);
      this.setState({
        errorMessage: 'Error fetching colleges. Please try again later.', // Display error message
        filteredColleges: [], // Clear colleges list on error
      });
    }
  };

  render() {
    const { rankInput, caste, category, filteredColleges, errorMessage } = this.state;

    return (
      <div className="collegePredictor">
        <h1>College Predictor</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your TS EAMCET Rank:
            <input
              type="number"
              value={rankInput}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Select Caste:
            <select value={caste} onChange={this.handleCasteChange}>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </label>
          <label>
            Select Category:
            <select value={category} onChange={this.handleCategoryChange}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
          </label>
          <button type="submit">Predict Colleges</button>
        </form>
        
        {errorMessage && <p className="error">{errorMessage}</p>}

        {filteredColleges.length > 0 && (
          <div className="collegesContainer">
            <h2>Colleges Available for Your Rank ({rankInput}), Caste ({caste}), and Category ({category})</h2>
            <Thumbnails colleges={filteredColleges} />
          </div>
        )}
      </div>
    );
  }
}

export default CollegePredictor;
