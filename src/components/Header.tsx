"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { RemoveScroll } from "react-remove-scroll";
import { useRouter } from "next/navigation";
import { Root, Trigger } from "@radix-ui/react-dialog";
import { useStore } from "../../store/store";
import { useSSR } from "@lib/hooks";
import dynamic from "next/dynamic";
import { supabase } from "@lib/supabase";
import { useSession } from "@lib/hooks";
import { Session } from "@supabase/auth-helpers-nextjs";
import Avatar from "./radix/Avatar";

const CartComponent = dynamic(() => import("./CartComponent"));

const Header = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);

  const noSSRCart = useStore((state) => state.cart);
  const cart = useSSR() ? noSSRCart : [];

  const session = useSession();
  const user = session?.user;

  return (
    <div
      className={`fixed flex flex-col z-20 inset-x-0 top-0 w-full  font-mono text-sm bg-gradient-to-b
     from-zinc-400 dark:from-zinc-800 border-b border-gray-400 dark:border-neutral-800 ${
       open ? "" : "backdrop-blur-lg"
     }`}>
      <div className='flex px-4 py-3 w-full items-start justify-between'>
        {/* {isMutating && <LoadingBlur />} */}
        {/* <button
          className='bg-blue-400 p-2 rounded-lg'
          onClick={() => trigger()}>
          Click
        </button> */}
        <MobileMenu session={session} open={open} setOpen={setOpen} />
        <Logo />
        <div className='flex gap-4 items-center'>
          <Root open={openC} onOpenChange={setOpenC}>
            <CartComponent rawCart={cart} setOpen={setOpenC} />
            <Trigger className='relative'>
              <ShoppingCartIcon width={25} />
              <span
                className='absolute top-0 -right-1 text-[13px] font-semibold bg-red-500 flex justify-center items-center
               text-white rounded-full h-[14px] w-[14px]'>
                {cart.length}
              </span>
            </Trigger>
          </Root>
          <button
            onClick={() =>
              !session ? router.push("/login") : router.push("/my-profile")
            }>
            <Avatar className='w-8 h-8 rounded-full' fallback={user?.email} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MobileMenu = ({
  open,
  setOpen,
  session,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
}) => {
  const router = useRouter();

  return (
    <>
      <button onClick={() => setOpen((s) => !s)}>
        <Bars3Icon width={24} />
      </button>

      {open && (
        <RemoveScroll
          className='fixed z-50 inset-0 p-4 w-full h-full bg-white/50 transition-all
         dark:bg-black/80 backdrop-blur-lg '>
          <button onClick={() => setOpen((s) => !s)}>
            <XMarkIcon width={28} stroke='black' />
          </button>

          <div className='flex flex-col mt-10'>
            <button
              onClick={() => {
                router.push("/");
                setOpen(false);
              }}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              Home
            </button>
            <button
              onClick={() => {
                router.push("menu");
                setOpen(false);
              }}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              Menu
            </button>
            {session && (
              <>
                <button
                  onClick={() => {
                    router.push("my-orders");
                    setOpen(false);
                  }}
                  className='text-lg py-1.5 w-full hover:bg-stone-100'>
                  My Orders
                </button>
                <button
                  onClick={() => {
                    router.push("my-profile");
                    setOpen(false);
                  }}
                  className='text-lg py-1.5 w-full hover:bg-stone-100'>
                  My Profile
                </button>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setOpen(false);
                  }}
                  className='text-lg py-1.5 w-full text-amber-800 hover:bg-stone-100'>
                  Sign Out
                </button>
              </>
            )}
            <button
              onClick={() => {
                router.push("/faq");
                setOpen(false);
              }}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              FAQs / Contact
            </button>

            {!session && (
              <div className='flex gap-4 mt-10'>
                <button
                  className='btn-outline'
                  onClick={() => {
                    router.push("/create-profile");
                    setOpen(false);
                  }}>
                  Create Profile
                </button>
                <button
                  className='btn'
                  onClick={() => {
                    router.push("/login");
                    setOpen(false);
                  }}>
                  Login
                </button>
              </div>
            )}
          </div>
        </RemoveScroll>
      )}
    </>
  );
};

const Logo = () => {
  return (
    <>
      <h1 className='text-xl font-semibold ml-10'>{"Ken's"}</h1>
    </>
  );
};

export default Header;
