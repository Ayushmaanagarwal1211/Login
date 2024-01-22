import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from "../components/Popup";

interface FormData {
  phonenumber: string;
  otp: string;
}

export default function LoginByPhone(): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();
  const [phonenumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [showpopup,setShowPopup]=useState(false)
  const [msg,setmsg]=useState('')
  function showpop(msg:any){
    console.log("HUDS")
    setShowPopup(true)
    setmsg(msg)
    setTimeout(()=>{
     setShowPopup(false)
     setmsg('')
    },2000)
  }
  async function handleSendOtp() {
    if(phonenumber.length!=10){
      showpop("Please Enter Valid phone Number")
      return
    }
    await fetch("http://localhost:3000/api/otpsend", {
      method: "POST",
      body: JSON.stringify({
        phonenumber: phonenumber,
      }),
    }).then((res) => {
      res.json().then((otp) => {
        setOtp(otp)
        showpop("Otp Has Been Sent");
      });
    });
    console.log(phonenumber);
  }

  async function handleSignIn(data: FormData) {
    if (data.otp === otp) {
      router.push('/content');
    } else {
      console.log("Otp Is Wrong");
    }
  }
function loginWithEmail(){
  router.push('/loginbyemail')
}
  return (
    <>     {showpopup && <Popup msg={msg}/>}

       <div className=" bg-black min-h-screen flex items-center justify-center ">
      <div className="bo max-w-md w-full p-6 space-y-6 bg-white shadow-md">
        <h2 className="text-white text-3xl font-bold text-center">Login By Phone</h2>

        <form className='flex flex-col gap-2' onSubmit={handleSubmit(handleSignIn)}>
          <label className='text-lg'>Enter Phone number</label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full in p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center justify-between">
         
         
            <button onClick={handleSendOtp} className="text-white text-large">
              Send Otp
            </button>

            <button onClick={loginWithEmail} className="text-white text-lg">
                Login with Email
              </button>
          </div>
          <label className='text-lg'>Otp</label>
          <input
            type="text"
            {...register("otp", { required: true })}
            className=" w-full in p-2 border border-gray-300 rounded"
          ></input>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div></>

  );
}
