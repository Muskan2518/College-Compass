import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import classes from './registerPgae.module.css';
import Title from '../Title/Title';
import Input from '../input/Input';

export default function RegisterPage() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user, register: registerUser } = useAuth();

  const submit = async ({ name, email, password }) => {
    await registerUser(name, email, password);
    navigate('/'); // Redirect to home page after successful registration
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Entered value does not match email format'
              }
            })}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters'
              }
            })}
            error={errors.password}
          />
          <button type="submit" className={classes.submitButton}>Register</button>
        </form>
      </div>
    </div>
  );
}