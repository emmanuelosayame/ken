import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { customerS } from "@/server/db/schema";
import { db } from "@/server/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { UserForm } from "./Client";
import { redirect } from "next/navigation";

const getData = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  if (!userId) {
    // await supabase.auth.updateUser({})
    redirect("/");
    // throw new Error("USER DOES NOT EXIST");
  }

  const [customer] = await db
    .select()
    .from(customerS)
    .where(eq(customerS.id, userId));

  if (!customer) {
    // throw new Error("USER DOES NOT EXIST");
    redirect("/");
  }

  return customer;
};

const MyProfilePage = async () => {
  const customer = await getData();

  return (
    <div className='w-full '>
      <UserForm customer={customer} />
    </div>
  );
};

export default MyProfilePage;
