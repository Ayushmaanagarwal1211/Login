import React, { useState } from 'react';
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
const [showpopup,setShowPopup]=useState(false)
const [msg,setmsg]=useState('')
function showpop(msg){
  setShowPopup(true)
  setmsg(msg)
  setTimeout(()=>{
   setShowPopup(false)
   setmsg('')
  },2000)
}

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
    <div className="  bg-black min-h-screen flex items-center justify-center ">
      <div className="  bo max-w-md   w-full p-6 space-y-6  shadow-md text-white" >
        <h2 className="text-4xl font-bold text-center">Signin</h2>
        <form className='fo' onSubmit={handleSubmit(createUser)}>
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full in  p-2 border border-gray-300 rounded"
          />
          <label >Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full in p-2 border border-gray-300 rounded"
          />
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full in p-2 border border-gray-300 rounded"
          />
          <label>Re-enter Password</label>
          <input
            type="password"
            {...register("repassword", { required: true })}
            className="w-full in p-2 border border-gray-300 rounded"
          />
          <label>Phone Number</label>
          <input
            type="tel"
            {...register("phonenumber", { required: true })}
            className="w-full in p-2 border border-gray-300 rounded"
          />
          <button className="w-full p-2 bg-blue-500 text-white rounded mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
