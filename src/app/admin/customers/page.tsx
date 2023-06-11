import { limitText } from "@lib/helpers";
import { Pagination, TableButton } from "./Client";

const AdminCustomer = () => {
  return (
    <div className='w-full h-full'>
      <div className='p-2'>
        <h2 className='text-lg font-medium'>Customers</h2>
      </div>
      <div className='border border-neutral-300 rounded-xl'>
        <table
          className='w-full border-spacing-y-1 border-spacing-x-2 border-separate text-[14px]
         md:text-base text-center'>
          <thead>
            <tr className='border-b border-b-neutral-400'>
              <td>Name (s)</td>
              <td>Phone</td>
              <td>Location</td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5].map((order) => (
              <tr key={order}>
                <td className='py-1'>{limitText("Emmanuel Osayame", 10)}</td>
                <td className='py-1'>09159114491</td>
                <td className='py-1'>Uniben</td>
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

export default AdminCustomer;
