import React from 'react';
import { useRouter } from 'next/router';

export default function Verify(): JSX.Element {
  const router = useRouter();



  function handleClick(): void {
    router.push('/loginbyemail');
  }

  return (
    <div className=' h-[100vh] w-[100vw] flex flex-col justify-center items-center font-bold text-5xl'>
      Verification mail has been sent to your email
      <button onClick={handleClick} className="w-[200px] p-2 bg-blue-500 text-white rounded mt-2">
            Submit
          </button>
    </div>
  );
}
