import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true }
});

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ts_eamcet_colleges = [
  {
    name: 'JNTU College of Engineering, Hyderabad',
    establishedYear: 1965,
    location: 'Hyderabad, Telangana',
    studentCount: 4000,
    public: true,
    imageUrl: 'jntu.PNG',
    imageUrl2: 'jntu1.jpeg',
    tags: ['Public', 'Engineering', 'Research'],
    fees: 50000,
    cutoffRanks: {
      CSE: { General: 500, OBC: 1000, SC: 2000, ST: 3000 },
      ECE: { General: 1000, OBC: 1500, SC: 2500, ST: 3500 },
      MECH: { General: 2000, OBC: 2500, SC: 3500, ST: 4500 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'John Doe', review: 'Great campus and facilities.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Jane Smith', review: 'Experienced faculty and good placements.', createdAt: new Date() }
    ]
  },
  {
    name: 'Chaitanya Bharathi Institute of Technology, Hyderabad',
    establishedYear: 1979,
    location: 'Hyderabad, Telangana',
    studentCount: 3500,
    public: false,
    imageUrl: 'Chaitanya_Bharathi_Institute_of_Technology_logo.PNG',
    imageUrl2: 'cbit1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 120000,
    cutoffRanks: {
      CSE: { General: 1500, OBC: 2000, SC: 3000, ST: 4000 },
      ECE: { General: 2500, OBC: 3000, SC: 4000, ST: 5000 },
      MECH: { General: 3000, OBC: 3500, SC: 4500, ST: 5500 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Alice Brown', review: 'Excellent infrastructure.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Bob Johnson', review: 'Good opportunities for research.', createdAt: new Date() }
    ]
  },
  {
    name: 'Vasavi College of Engineering, Hyderabad',
    establishedYear: 1981,
    location: 'Hyderabad, Telangana',
    studentCount: 3000,
    public: false,
    imageUrl: 'vasavi.JPEG',
    imageUrl2: 'vasavi1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 100000,
    cutoffRanks: {
      CSE: { General: 2000, OBC: 2500, SC: 3500, ST: 4500 },
      ECE: { General: 3000, OBC: 3500, SC: 4500, ST: 5500 },
      MECH: { General: 3500, OBC: 4000, SC: 5000, ST: 6000 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Charlie Green', review: 'Supportive environment and staff.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Diana White', review: 'Strong alumni network.', createdAt: new Date() }
    ]
  },
  {
    name: 'Gokaraju Rangaraju Institute of Engineering and Technology, Hyderabad',
    establishedYear: 1997,
    location: 'Hyderabad, Telangana',
    studentCount: 2800,
    public: false,
    imageUrl: 'gokaraju.PNG',
    imageUrl2: 'gokaraju1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 95000,
    cutoffRanks: {
      CSE: { General: 2500, OBC: 3000, SC: 4000, ST: 5000 },
      ECE: { General: 3500, OBC: 4000, SC: 5000, ST: 6000 },
      MECH: { General: 4000, OBC: 4500, SC: 5500, ST: 6500 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Eve Black', review: 'Modern labs and facilities.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Frank Wilson', review: 'Diverse campus activities.', createdAt: new Date() }
    ]
  },
  {
    name: 'CVR College of Engineering, Hyderabad',
    establishedYear: 2001,
    location: 'Hyderabad, Telangana',
    studentCount: 2500,
    public: false,
    imageUrl: 'cvr.PNG',
    imageUrl2: 'cvr1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 90000,
    cutoffRanks: {
      CSE: { General: 3000, OBC: 3500, SC: 4500, ST: 5500 },
      ECE: { General: 4000, OBC: 4500, SC: 5500, ST: 6500 },
      MECH: { General: 4500, OBC: 5000, SC: 6000, ST: 7000 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'George Brown', review: 'Excellent faculty and support.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Hannah Davis', review: 'Good placement opportunities.', createdAt: new Date() }
    ]
  },
  {
    name: 'Mahatma Gandhi Institute of Technology, Hyderabad',
    establishedYear: 1997,
    location: 'Hyderabad, Telangana',
    studentCount: 2600,
    public: false,
    imageUrl: 'mahatma.PNG',
    imageUrl2: 'mgit1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 85000,
    cutoffRanks: {
      CSE: { General: 3500, OBC: 4000, SC: 5000, ST: 6000 },
      ECE: { General: 4500, OBC: 5000, SC: 6000, ST: 7000 },
      MECH: { General: 5000, OBC: 5500, SC: 6500, ST: 7500 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Ian Gray', review: 'Friendly atmosphere and good curriculum.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Jenny Lee', review: 'Focus on holistic development.', createdAt: new Date() }
    ]
  },
  {
    name: 'Kakatiya Institute of Technology and Science, Warangal',
    establishedYear: 1980,
    location: 'Warangal, Telangana',
    studentCount: 3200,
    public: false,
    imageUrl: 'kakatiya.PNG',
    imageUrl2: 'kakatiya1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 80000,
    cutoffRanks: {
      CSE: { General: 4000, OBC: 4500, SC: 5500, ST: 6500 },
      ECE: { General: 5000, OBC: 5500, SC: 6500, ST: 7500 },
      MECH: { General: 5500, OBC: 6000, SC: 7000, ST: 8000 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Karl Black', review: 'Good campus and library.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Laura Green', review: 'Supportive management.', createdAt: new Date() }
    ]
  },
  {
    name: 'Malla Reddy College of Engineering and Technology, Hyderabad',
    establishedYear: 2004,
    location: 'Hyderabad, Telangana',
    studentCount: 2400,
    public: false,
    imageUrl: 'mallareddy.JPEG',
    imageUrl2: 'mallareddy1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 85000,
    cutoffRanks: {
      CSE: { General: 4500, OBC: 5000, SC: 6000, ST: 7000 },
      ECE: { General: 5500, OBC: 6000, SC: 7000, ST: 8000 },
      MECH: { General: 6000, OBC: 6500, SC: 7500, ST: 8500 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Mike Brown', review: 'Interactive teaching methods.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Nina Blue', review: 'Good industry connections.', createdAt: new Date() }
    ]
  },
  {
    name: 'VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad',
    establishedYear: 1995,
    location: 'Hyderabad, Telangana',
    studentCount: 3100,
    public: false,
    imageUrl: 'vnr.JPEG',
    imageUrl2: 'vnr1.jpeg',
    tags: ['Private', 'Engineering', 'Technology'],
    fees: 115000,
    cutoffRanks: {
      CSE: { General: 5000, OBC: 5500, SC: 6500, ST: 7500 },
      ECE: { General: 6000, OBC: 6500, SC: 7500, ST: 8500 },
      MECH: { General: 6500, OBC: 7000, SC: 8000, ST: 9000 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Olivia White', review: 'Innovative teaching methods.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Paul Gray', review: 'Strong placement support.', createdAt: new Date() }
    ]
  },
  {
    name: 'JNTU College of Engineering, Sultanpur',
    establishedYear: 2012,
    location: 'Sultanpur, Telangana',
    studentCount: 2000,
    public: true,
    imageUrl: 'jntusulthanpur.PNG',
    imageUrl2: 'jntusulthanpur1.jpeg',
    tags: ['Public', 'Engineering', 'Technology'],
    fees: 60000,
    cutoffRanks: {
      CSE: { General: 6000, OBC: 6500, SC: 7000, ST: 7500 },
      ECE: { General: 7000, OBC: 7500, SC: 8000, ST: 8500 },
      MECH: { General: 7500, OBC: 8000, SC: 8500, ST: 9000 }
    },
    ratings: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), rating: 4 },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), rating: 5 }
    ],
    reviews: [
      { userId: new ObjectId('5f0c089535b6c1eae0c8c694'), userName: 'Quincy Blue', review: 'Growing institution with potential.', createdAt: new Date() },
      { userId: new ObjectId('5f0c089535b6c1eae0c8c695'), userName: 'Rachel Black', review: 'Good faculty and resources.', createdAt: new Date() }
    ]
  }
];
