import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from '../components/Popup';
interface FormData {
  password: string;
  repassword: string;
}

export default function PasswordReset(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [showpopup,setShowPopup]=useState(false)
  const [msg,setmsg]=useState('')
  function showpop(msg:any){
    setShowPopup(true)
    setmsg(msg)
    setTimeout(()=>{
     setShowPopup(false)
     setmsg('')
    },2000)
  }
  async function handleChangePass(data: FormData): Promise<void> {
    const { token } = router.query;

    if (data.password === data.repassword) {
      await fetch("http://localhost:3000/api/changepassword", {
        method: "POST",
        body: JSON.stringify({
          token: token,
          password: data.password,
        }),
      });
  router.push("/loginbyemail");   }else{
      showpop("Passwords Not Match")
    }

   
  }

  return (
    <>
        {showpopup && <Popup msg={msg}/>}

      <form onSubmit={handleSubmit(handleChangePass)}>
        <label>Enter New Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label>Password</label>
        <input
          type="password"
          {...register('repassword', { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Change Password
        </button>
      </form>
    </>
  );
}
