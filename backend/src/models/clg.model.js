import mongoose from "mongoose";
const { Schema } = mongoose;

// Define a sub-schema for cutoff ranks
const CutoffRankSchema = new Schema({
  General: { type: Number, required: true },
  OBC: { type: Number, required: true },
  SC: { type: Number, required: true },
  ST: { type: Number, required: true }
});

// Main schema for colleges
const CollegeSchema = new Schema({
  name: { type: String, required: true },
  establishedYear: { type: Number, required: true },
  location: { type: String, required: true },
  studentCount: { type: Number, required: true },
  public: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
  imageUrl2: { type: String, required: true },
  tags: [{ type: String, required: true }],
  fees: { type: Number, required: true },
  cutoffRanks: {
    CSE: { type: CutoffRankSchema, required: true },
    ECE: { type: CutoffRankSchema, required: true },
    MECH: { type: CutoffRankSchema, required: true }
  },
  ratings: [
    {
      userId: { type: Schema.Types.ObjectId,  },
      rating: { type: Number,  }
    }
  ],
  reviews: [
    {
      userId: { type: Schema.Types.ObjectId, },
      userName: { type: String  },
      review: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

const CollegeModel = mongoose.model('College', CollegeSchema);

// Export the model
export default CollegeModel;
