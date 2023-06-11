"use client";
import { client } from "@/server/client";
import useSwr from "swr";

const AdminHome = () => {
  const {
    data: latestOrders,
    isLoading,
    error,
  } = useSwr(
    [`orders.many`],
    async () => await client.order.manyA.query({ limit: 10 }),
    { shouldRetryOnError: false }
  );

  return (
    <div className='h-full w-full flex flex-col gap-5'>
      <div className='h-52'>
        <h3 className='text-lg font-semibold'>Metrics</h3>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-lg font-semibold'>Orders</h3>

        <div className=''>
          {latestOrders?.map((order) => (
            <div key={order.id} className=''>
              <h2>{order.orderId}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
