"use client";

import { client } from "@/server/client";
import { Filter } from "./Client";
import useSwr from "swr";
import { dateTimeLocale, orderStatusColor } from "@lib/helpers";
import { LoadingBlur } from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import { Order } from "@/server/db/schema";

const MyOrdersPage = () => {
  const searchParams = useSearchParams();
  const allStatus = searchParams.get("status");
  const status =
    allStatus === "all" || allStatus === null
      ? undefined
      : (allStatus as Order["status"] | undefined);

  const { data, isLoading, mutate, isValidating } = useSwr(
    [`orders.many.admin`, status],
    async () => await client.order.many.query({ limit: 10, status })
  );

  // const user = useSession();

  // console.log(user?.user.id);

  return (
    <div className='w-full '>
      {(isLoading || isValidating) && <LoadingBlur />}
      <Filter />

      <div className='p-2 my-3 flex justify-end'>
        <button
          className='text-sm text-stone-500 font-medium'
          onClick={() => mutate()}>
          Refetch
        </button>
      </div>

      <div className='w-full max-w-xl mx-auto'>
        {data?.map((order) => (
          <div
            key={order.id}
            className='bg-white/75 p-2 flex justify-between items-center border-b last:border-b-transparent'>
            <div className=''>
              <p className='font-medium'>{order.description}</p>
              <p className='text-sm'>{order.orderId}</p>
            </div>

            <div className='text-end'>
              <p className='text-sm text-neutral-600'>
                {dateTimeLocale(order.created_at)}
              </p>
              <p className={`text-sm ${orderStatusColor(order.status)}`}>
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
