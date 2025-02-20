import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // Optionally add required: true if address is mandatory
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel; // Export the UserModel as default

// Optionally, you can export the userSchema if needed
// export { UserModel, userSchema };

