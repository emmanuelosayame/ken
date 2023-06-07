import CheckoutComp from "@/components/CheckoutComp";
import { customerS } from "@/server/db/schema";
import { db } from "@/server/drizzle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import Link from "next/link";

const getData = async () => {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (!userId) {
      return;
    }
    const [customer] = await db
      .select()
      .from(customerS)
      .where(eq(customerS.id, userId));
    return customer;
  } catch (err) {
    const error = err as any;
    throw new Error(error);
  }
};

const CheckoutPage = async () => {
  const customer = await getData();

  return (
    <div className='w-full px-5'>
      <h1 className='text-xl font-semibold'>Checkout</h1>
      {!customer && (
        <div className='flex gap-2 w-full my-2'>
          <p className='mx-2'>Returning Customer ?</p>
          <Link href={"/login"} className='underline text-base text-white'>
            login
          </Link>
        </div>
      )}

      <CheckoutComp customer={customer} />
    </div>
  );
};

export default CheckoutPage;

export const dynamic = "force-dynamic";
