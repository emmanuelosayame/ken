"use client";
import {
  dateLocale,
  timeLocale,
  limitText,
  orderStatusColor,
} from "@lib/helpers";
import { Pagination, TableButton } from "../Client";
import useSwr from "swr";
import { client } from "@/server/client";

const AdminOrders = () => {
  const { data } = useSwr(
    [`orders.many.admin`],
    async () => await client.order.manyA.query({ limit: 10 })
  );

  return (
    <div className='w-full h-full'>
      <div className='p-4'>
        <h2 className='text-lg font-medium'>Orders</h2>
      </div>
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
          {data?.map((order) => (
            <tr key={order.id} className='bg-white/60'>
              {/* <td className='py-1'>{limitText("3ede4r4r4f442ey1", 10)}</td> */}
              <td className='py-1 flex flex-col'>
                <span className='text-red-500 font-medium'>
                  {timeLocale(order.created_at)}
                </span>
                <span className='text-xs'>{dateLocale(order.created_at)}</span>
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
      <Pagination />
    </div>
  );
};

export default AdminOrders;
