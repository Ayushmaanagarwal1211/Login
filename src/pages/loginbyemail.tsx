import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Popup from "../components/Popup";

interface FormData {
  email: string;
  password: string;
}

export default function LoginByEmail() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginMethod, setLoginMethod] = useState("email");
  const router = useRouter();
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
  const handleSignIn = async (data: FormData) => {
    await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then((res) => {
      res.json().then((ans) => {
        if (
          ans !== "Not Valid Email" &&
          ans !== "Not Valid Password" &&
          ans !== "User is Not verified"
        ) {
          localStorage.setItem("user", ans);
          router.push("/content");
        } else {
          console.log(ans);
          showpop(ans)
        }
      });
    });
  };

  const handleResetPass = async (data: { email: string }) => {
    await fetch("http://localhost:3000/api/checkuser", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        reset: true,
      }),
    }).then((res) => {
      res.json().then((ans) => {
        if (ans === "true") {
          router.push("/verify");
        }else{
showpop(ans)
        }
      });
    });
  };

  const loginWithPhone = () => {
    router.push("/loginbyphone");
  };

  const otpShow2 = () => {
    setLoginMethod("reset");
  };

  return (
    <>
    {showpopup && <Popup msg={msg}/>}
    <div className="bg-black min-h-screen flex items-center justify-center ">
      <div id="sign-in-button"></div>
      <div className="bo max-w-md w-full p-6 space-y-6  bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {loginMethod === "email" && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
            <div id="sign-in-button"></div>
            <label className="text-lg">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full in p-2 border border-gray-300 rounded"
            />
            <label className="text-lg">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full in p-2 border border-gray-300 rounded"
            />
            <div className="flex items-center justify-between">
              <button onClick={otpShow2} className="text-white text-lg">
                Forgot Password?
              </button>
              <button onClick={loginWithPhone} className="text-white text-lg">
                Login with phone
              </button>
            </div>
            <button
              
              className="w-full p-2 bg-blue-500 text-white rounded mt-2"
            >
              Submit
            </button>
          </form>
        )}

        {loginMethod !== "email" && (
          <form onSubmit={handleSubmit(handleResetPass)}>
            <div id="sign-in-button"></div>
            <label className="text-lg">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full in p-2 border border-gray-300 rounded"
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded mt-2"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div></>
  );
}
