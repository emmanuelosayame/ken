"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-24 w-full'>
      <Header />

      <div
        className="relative flex flex-col gap-1 w-10/12 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]
       border-2 border-stone-400 rounded-lg p-3">
        <h1 className='text-lg font-medium'>Start your order</h1>
        <div className='flex gap-5 w-full'>
          <button className='text-sm border border-stone-500 text-stone-500 rounded-lg py-3 w-full'>
            Menu
          </button>
          <button className='text-sm bg-stone-500 text-white rounded-lg py-3 w-full'>
            Place Order
          </button>
        </div>
      </div>

      <div className='my-10 flex flex-col gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left w-10/12'>
        <div className='w-full h-72 rounded-lg p-2 bg-white flex flex-col justify-center items-center'>
          image here
        </div>
        <div className='w-full h-72 rounded-lg p-2 bg-white flex flex-col justify-center items-center'>
          image here
        </div>
      </div>

      <Footer />

      <div
        className='fixed bottom-0 left-0 flex h-40 w-full items-end justify-center bg-gradient-to-t
       from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
        <div className='w-full p-4 text-center'>
          <h1 className='font-semibold'>
            Food by <span className='text-red-500'>delorand</span>
          </h1>
        </div>
      </div>
    </main>
  );
}

//  <a
//    className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
//    href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//    target='_blank'
//    rel='noopener noreferrer'>
//    Food by <h1>delorand</h1>
//  </a>;
