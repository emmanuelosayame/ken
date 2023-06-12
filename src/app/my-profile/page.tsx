import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { customerS } from "@/server/db/schema";
import { db } from "@/server/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { UserForm } from "./Client";

const getData = async () => {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (!userId) throw new Error("USER DOES NOT EXIST");

    const [customer] = await db
      .select()
      .from(customerS)
      .where(eq(customerS.id, userId));

    if (!customer) throw new Error("USER DOES NOT EXIST");

    return customer;
  } catch (err) {
    const error = err as any;
    throw new Error(error);
  }
};

const MyProfilePage = async () => {
  const customer = await getData();
  // const user = useSession();

  // console.log(user?.user.id);

  return (
    <div className='w-full '>
      <UserForm customer={customer} />
    </div>
  );
};

export default MyProfilePage;
