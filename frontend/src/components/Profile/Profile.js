// ProfilePage.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import classes from './profilePage.module.css';
import Title from '../../components/Title/Title';
import Input from '../input/Input';
import Button from '../Button/Button';
import ChangePassword from '../ChangePassword/ChangePassword';

export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      setUpdateSuccess(true);
      setUpdateError(null);
    } catch (error) {
      setUpdateError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            defaultValue={user.name || ''}
            type="text"
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 5, message: 'Name must be at least 5 characters long' },
            })}
            error={errors.name?.message}
          />
          <Input
            defaultValue={user.address || ''}
            type="text"
            label="Address"
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Address must be at least 10 characters long' },
            })}
            error={errors.address?.message}
          />

          {updateError && <p className="error-message">{updateError}</p>}
          {updateSuccess && (
            <p className="success-message">Profile updated successfully!</p>
          )}

          <Button
            type="submit"
            text="Update"
            backgroundColor="#009e84"
            disabled={isLoading}
          />
          {isLoading && <p>Loading...</p>}
        </form>

        <ChangePassword />
      </div>
    </div>
  );
}
