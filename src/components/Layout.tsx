import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between pb-16 pt-20 w-full overflow-x-hidden'>
      <Header />
      {children}
      <Footer />

      {/* <div
        className='fixed bottom-0 left-0 flex h-36 w-full items-end justify-center bg-gradient-to-t
       from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
        <div className='w-full p-4 text-center'>
          <h1 className='font-medium text-sm'>
            Food by <span className='text-red-500'>delorand</span>
          </h1>
        </div>
      </div> */}
    </main>
  );
};

export default Layout;
