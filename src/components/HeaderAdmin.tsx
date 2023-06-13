"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { RemoveScroll } from "react-remove-scroll";
import { useRouter } from "next/navigation";
import { useSession } from "@lib/hooks";
import { Session } from "@supabase/auth-helpers-nextjs";
import Avatar from "./radix/Avatar";

const Header = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

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
        <button
          onClick={() =>
            !session ? router.push("/login") : router.push("/admin/account")
          }>
          <Avatar className='w-8 h-8 rounded-full' fallback={user?.email} />
        </button>
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
          className='fixed z-50 inset-0 p-4 w-full h-full bg-white/50
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
                router.push("/admin/orders");
                setOpen(false);
              }}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              Orders
            </button>

            <button
              onClick={() => {
                router.push("/admin/customers");
                setOpen(false);
              }}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              Customers
            </button>
            <button
              onClick={() => {
                router.push("/admin/customers");
                setOpen(false);
              }}
              className='text-lg py-1.5 w-full hover:bg-stone-100'>
              Nofifications
            </button>
          </div>
        </RemoveScroll>
      )}
    </>
  );
};

const Logo = () => {
  return (
    <>
      <h1 className='text-lg font-semibold'>Admin | {"Ken's"}</h1>
    </>
  );
};

export default Header;
