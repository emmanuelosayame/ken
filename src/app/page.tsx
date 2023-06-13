"use client";
import Layout from "@/components/Layout";
import { useAnimate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  return (
    <Layout>
      <div
        className="relative flex flex-col gap-1 w-10/12 place-items-center before:absolute before:h-[300px] before:w-[480px]
         before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]
       border-2 border-stone-400 rounded-lg p-3">
        <h1 className='text-lg'>Start your order</h1>
        <div className='flex gap-5 w-full'>
          <Link href='/menu' className='btn'>
            Menu
          </Link>
          {/* <button className='btn'>Place Order</button> */}
        </div>
      </div>

      <div className='my-10 flex flex-col gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left w-11/12'>
        {[0, 1].map((x) => (
          <Card key={x} x={x} />
        ))}
      </div>
    </Layout>
  );
}

//  <a
//    className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
//    href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//    target='_blank'
//    rel='noopener noreferrer'>
//    Food by <h1>delorand</h1>
//  </a>;

const Card = ({ x }: { x: number }) => {
  const [ref, animate] = useAnimate();

  useEffect(() => {
    animate(ref.current, {
      opacity: 1,
      scale: [1, 1.1, 1],
      rotate: 0,
      // type: "spring",
      duration: 0.5,
      borderRadius: ["50%", "30%", "10%", "3%"],
    });
  }, [animate, ref]);

  return (
    <div
      ref={ref}
      // style={{ animation: "ease" }}
      className={`w-full h-72 rounded-lg p-2 bg-white flex flex-col justify-center items-center 
      scale-125 rotate-6 border opacity-50 ${
        x % 2 === 1 ? "rotate-45" : "-rotate-12"
      }`}>
      image here
    </div>
  );
};
