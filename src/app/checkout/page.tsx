import CheckoutComp from "@/components/CheckoutComp";
import { customerS } from "@/server/db/schema";
import { db } from "@/server/drizzle";
import { eq } from "drizzle-orm";
import Link from "next/link";

const CheckoutPage = async () => {
  const userId = "useru87y3h66g7ygyg8t";
  const [customer] = await db
    .select()
    .from(customerS)
    .where(eq(customerS.id, userId));

  // console.log(customer);

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
