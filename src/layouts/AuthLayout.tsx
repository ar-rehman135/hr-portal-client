import React from 'react';

import Image from 'next/image';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      <div className="w-full md:w-7/12 flex items-center justify-center px-20 pb-1">
        {children}
      </div>
      <div className="hidden md:flex md:w-7/12">
        <div className="relative w-full flex flex-col justify-between">
          <div className="absolute inset-0">
            <Image
              src="/images/auth-bg.png"
              alt="Login Image"
              className="w-full h-full object-fill"
              fill
            />
            <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl  text-white ">
              <span className="font-bold text-6xl">Welcome to</span> <br /> HR Gen AI
              Assistant
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
