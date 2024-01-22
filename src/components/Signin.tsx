import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface FormData {
  username: string;
  email: string;
  password: string;
  repassword: string;
  phonenumber: string;
}

export default function Signin(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  async function createUser(data: FormData): Promise<void> {
    console.log(data);
    if (data.password === data.repassword) {
      await fetch("http://localhost:3000/api/adduser", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          phonenumber: data.phonenumber,
          username: data.username,
          isVerify: false,
        }),
      }).then((res) => {
        res.json().then((d) => {
          localStorage.setItem('token', d);
        });
      });
      router.push('/verify');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Signin</h2>
        <form onSubmit={handleSubmit(createUser)}>
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label>Re-enter Password</label>
          <input
            type="password"
            {...register("repassword", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label>Phone Number</label>
          <input
            type="tel"
            {...register("phonenumber", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button className="w-full p-2 bg-blue-500 text-white rounded mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
