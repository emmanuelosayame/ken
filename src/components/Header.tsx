"use client";

import { useState } from "react";
import {
  Bars3Icon,
  CheckCircleIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { RemoveScroll } from "react-remove-scroll";
import { useRouter } from "next/navigation";
import { Root, Content, Trigger, Overlay } from "@radix-ui/react-dialog";
import Checkbox from "./Checkbox";

const Header = () => {
  const router = useRouter();
  return (
    <div
      className={`fixed flex flex-col z-20 inset-x-0 top-0 w-full max-w-5xl  font-mono text-sm bg-gradient-to-b
     from-zinc-400 border-b border-gray-300`}>
      <div className='flex px-5 py-4 w-full items-start justify-between'>
        <MobileMenu />
        <Logo />
        <div className='flex gap-2 items-center'>
          <Root>
            <Overlay className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
            <Cart />
            <Trigger className=''>
              <ShoppingCartIcon width={25} />
            </Trigger>
          </Root>
          <button onClick={() => router.push("/cart")}>
            <UserCircleIcon width={27} />
          </button>
        </div>
      </div>
    </div>
  );
};

{
  /* <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
  Get started by editing&nbsp;
  <code className='font-mono font-bold'>src/app/page.tsx</code>
</p>; */
}

const Cart = () => {
  const router = useRouter();

  // console.log(open);

  const cart = [
    { title: "Big Shawarma", price: 1500, quantity: 4 },
    { title: "Small Shawarma", price: 800, quantity: 4 },
  ];

  return (
    <Content className='overflow-hidden w-full  p-4 fixed center-x top-28'>
      <div className='bg-white backdrop-blur-lg rounded-xl p-4 shadow-md'>
        <div className='flex gap-5'>
          <h2 className='text-lg font-semibold'>Cart</h2>
          <button className='text-red-400'>select all</button>
          <button>
            <TrashIcon width={23} />
          </button>
        </div>
        <div className='border-b border-b-gray-300 w-full my-1' />
        <div className='flex flex-col gap-3 pt-2'>
          {cart.map((item, index) => (
            <div key={index} className='flex gap-3 items-center'>
              <Checkbox checked handleChange={() => {}} />
              <div>
                <div className='w-14 h-14 bg-black rounded-md' />
              </div>
              <div className='flex flex-col gap-1 flex-1'>
                <h2>{item.title}</h2>
                {/* <span>|</span> */}
                <p>₦ {item.price}</p>
              </div>

              <div className='flex items-center justify-between '>
                <button
                  className='bg-neutral-700 flex items-center justify-center
                   rounded-lg h-5 md:h-7 w-5 md:w-7 text-white shadow-md disabled:opacity-70'
                  aria-label='decreament-item'
                  // disabled={item.quantity < 2}
                >
                  <MinusIcon width={18} stroke='white' />
                </button>
                <p className='w-6 text-center text-[17px]'>{item.quantity}</p>
                <button
                  className='bg-red-300 flex items-center justify-center
                   rounded-lg h-6 md:h-7 w-6 text-red-600 shadow-md disabled:opacity-70'
                  aria-label='decreament-item'
                  // disabled={item.quantity > 19}
                >
                  <PlusIcon width={18} />
                </button>
              </div>
              <button>
                <TrashIcon width={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-white rounded-xl p-4 mt-4 space-y-3 shadow-md'>
        <h3 className='text-lg'>Total: {2300}</h3>
        <button className='bg-black rounded-lg py-3 w-full text-white'>
          Checkout
        </button>
      </div>
    </Content>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <button onClick={() => setOpen((s) => !s)}>
        <Bars3Icon width={24} />
      </button>

      {open && (
        <RemoveScroll className='fixed z-50 inset-0 p-4 w-full h-full bg-white/50 backdrop-blur-md'>
          <button onClick={() => setOpen((s) => !s)}>
            <XMarkIcon width={28} stroke='black' />
          </button>

          <div className='flex flex-col mt-10'>
            <button
              onClick={() => router.push("cart")}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              Deals
            </button>
            <button
              onClick={() => router.push("my-orders")}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              My Orders
            </button>
            <button
              onClick={() => router.push("my-orders")}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              FAQs
            </button>

            <div className='flex gap-4 mt-10'>
              <button className='text-sm border border-stone-500 text-stone-500 rounded-lg py-3 w-full'>
                Signup
              </button>
              <button className='text-sm bg-stone-500 text-white rounded-lg py-3 w-full'>
                Login
              </button>
            </div>
          </div>
        </RemoveScroll>
      )}
    </>
  );
};

const Logo = () => {
  return (
    <>
      <h1 className='text-[22px] font-semibold'>{"Ken's"}</h1>
    </>
  );
};

export default Header;
