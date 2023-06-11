"use client";
import { client } from "@/server/client";
import { dateLocale, timeLocale } from "@lib/helpers";
import useSwr from "swr";
import useMutate from "swr/mutation";
import { TableButton, orderStatusColor } from "./Client";

const AdminHome = () => {
  const {
    data: latestOrders,
    isLoading,
    error,
  } = useSwr(
    [`orders.manyA`, { limit: 10, status: "paid" }],
    async (arg) =>
      await client.order.manyA.query({ limit: arg[1].limit, status: "paid" }),
    { shouldRetryOnError: false }
  );

  // const { trigger } = useMutate(
  //   [``],
  //   async () =>
  //     await client.order.createA.mutate({
  //       data: {
  //         description: "order for test sharwama",
  //         orderId: "u872yh27t7ggud2",
  //         status: "paid",
  //         total: 80000,
  //       },
  //     })
  // );

  return (
    <div className='h-full w-full flex flex-col gap-5'>
      <div className='flex flex-col mt-10'>
        <h3 className='text-lg font-semibold ml-5'>Latest Orders</h3>
        {/* <button onClick={() => trigger()}>Clickk</button> */}
        <table
          className='w-full border-spacing-y-1 border-separate text-[14px]
         md:text-base text-center'>
          <thead className='font-semibold bg-stone-300 rounded-t-2xl overflow-hidden'>
            <tr className=''>
              {/* <td>Order ID</td> */}
              <td className='py-1'>Date</td>
              <td className='py-1'>Description</td>
              <td className='py-1'>Status</td>
              <td className='py-1'></td>
            </tr>
          </thead>

          <tbody className=''>
            {latestOrders?.map((order) => (
              <tr key={order.id} className='bg-white/60'>
                {/* <td className='py-1'>{limitText("3ede4r4r4f442ey1", 10)}</td> */}
                <td className='py-1 flex flex-col'>
                  <span className='text-red-500 font-medium'>
                    {timeLocale(order.created_at)}
                  </span>
                  <span className='text-xs'>
                    {dateLocale(order.created_at)}
                  </span>
                </td>
                <td className='py-1'>{order.description}</td>
                <td className={`py-1 ${orderStatusColor(order.status)}`}>
                  {order.status}
                </td>
                <td>
                  <TableButton id={order.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='h-52'>
        <h3 className='text-lg font-semibold'>Metrics</h3>
      </div>
    </div>
  );
};

export default AdminHome;
