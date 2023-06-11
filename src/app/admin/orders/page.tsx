import { limitText } from "@lib/helpers";
import { Pagination, TableButton } from "./Client";

const AdminOrders = () => {
  return (
    <div className='w-full h-full'>
      <div className='p-2'>
        <h2 className='text-lg font-medium'>Orders</h2>
      </div>
      <div className='border border-neutral-300 rounded-xl'>
        <table
          className='w-full border-spacing-y-1 border-spacing-x-2 border-separate text-[14px]
         md:text-base text-center'>
          <thead>
            <tr className='border-b border-b-neutral-400'>
              <td>Order ID</td>
              <td>Date</td>
              <td>Description</td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5].map((order) => (
              <tr key={order}>
                <td className='py-1'>{limitText("3ede4r4r4f442ey1", 10)}</td>
                <td className='py-1 flex flex-col'>
                  <span>11/6/2023</span>
                  <span>05:28</span>
                </td>
                <td className='py-1'>jumbo Shawarma</td>
                <td>
                  <TableButton id={order.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default AdminOrders;
