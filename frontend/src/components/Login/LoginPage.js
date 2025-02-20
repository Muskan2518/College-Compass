import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import classes from './loginPage.module.css';
import Title from '../Title/Title';
import Input from '../input/Input';

export default function LoginPage() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (user) {
      returnUrl ? navigate(returnUrl) : navigate('/');
    }
  }, [user, navigate, returnUrl]);

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      returnUrl ? navigate(returnUrl) : navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login error, show error message to user
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          {errors.email && <p className={classes.error}>{errors.email.message}</p>}
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
          {errors.password && <p className={classes.error}>{errors.password.message}</p>}
          <button type="submit" className={classes.submitButton}>Login</button>
          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register${returnUrl ? `?returnUrl=${returnUrl}` : ''}`}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
