import React from 'react';
import { useForm } from 'react-hook-form';
import Title from '../Title/Title';
import Input from '../input/Input';
import Button from '../Button/Button';
import { useAuth } from '../hooks/useAuth';

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();

  const onSubmit = async (passwords) => {
    try {
      await changePassword(passwords.currentPassword, passwords.newPassword);
      // Clear form on success if needed
    } catch (error) {
      console.error('Error changing password:', error.message);
      // Handle error state or show error message to the user
    }
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          label="Current Password"
          {...register('currentPassword', {
            required: 'Current Password is required',
          })}
          error={errors.currentPassword}
        />

        <Input
          type="password"
          label="New Password"
          {...register('newPassword', {
            required: 'New Password is required',
            minLength: {
              value: 5,
              message: 'Password must have at least 5 characters',
            },
          })}
          error={errors.newPassword}
        />

        <Input
          type="password"
          label="Confirm Password"
          {...register('confirmNewPassword', {
            required: 'Please confirm your new password',
            validate: (value) =>
              value === getValues('newPassword') ||
              'Passwords do not match',
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" text="Change" />
      </form>
    </div>
  );
}
