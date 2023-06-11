import Header from "@/components/HeaderAdmin";

export const metadata = {
  title: "Admin | Ken's Food",
  description: "Shawarma and Babeque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen items-center justify-between pb-10 pt-16 w-full'>
      <Header />

      <div className=' w-full'>{children}</div>

      <div
        className='fixed bottom-0 left-0 flex h-36 w-full items-end justify-center bg-gradient-to-t
       from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
        <div className='w-full p-4 text-center'>
          <h1 className='font-medium text-sm'>
            Food by <span className='text-red-500'>delorand</span>
          </h1>
        </div>
      </div>
    </main>
  );
}
