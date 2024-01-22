import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export default function OtpVerification(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();

  const handleSignIn = (): void => {
    // Add your sign-in logic here
    console.log('Sign-in logic goes here');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Enter Otp</h2>

        <form>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="button" // Change to "submit" if you want to submit the form
            onClick={handleSignIn}
            className="w-full p-2 bg-blue-500 text-white rounded mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
