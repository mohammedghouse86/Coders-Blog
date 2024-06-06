import React from 'react';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const Contact = () => {
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center  ${inter.className}`} /*justify-between p-24 removed*/    
    >
      this is contact
    </main>
  )
}

export default Contact
