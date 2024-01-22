import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

import Signin from '@/pages/signin';
import Emaillogin from '@/components/Emaillogin';
import Verify from '@/pages/verify';
import React from 'react';

const Home: React.FC = () => {
  return  (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center  space-x-4" >
        <Link className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600" href="/signin">
            Signin
        </Link>
        <Link  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600" href="/loginbyemail">
          
            Login
          
        </Link>
       
      </div>
    </div>
  );
};

export default Home;
