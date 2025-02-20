import { connect } from 'mongoose';
import  UserModel  from '../models/user.model.js';
import CollegeModel from '../models/clg.model.js';
import { ts_eamcet_colleges } from '../data.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

export const dbconnect = async () => {
  try {
    await connect(process.env.MONGO_URI);
    await seedUsers();
    await seedColleges();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

async function seedUsers() {
  try {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      console.log('Users seed is already done!');
      return;
    }

    for (const user of sample_users) {
      user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
      await UserModel.create(user);
    }

    console.log('Users seed is done!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

async function seedColleges() {
  try {
    const collegesCount = await CollegeModel.countDocuments();
    if (collegesCount > 0) {
      console.log('Colleges seed is already done');
      return;
    }

    for (const college of ts_eamcet_colleges) {
      college.imageUrl = `/colleges/${college.imageUrl}`;
      await CollegeModel.create(college);
    }

    console.log('Colleges seed is done!');
  } catch (error) {
    console.error('Error seeding colleges:', error);
  }
}
