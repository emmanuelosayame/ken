"use client";
import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/store";

const ItemComponent = ({ data }: { data?: Item }) => {
  const router = useRouter();

  const user = null;

  const addToCart = useStore((state) => state.addToCart);

  const orderNow = () => {
    router.push("/checkout");
  };

  return (
    <div className='col-span-1 bg-white rounded-lg p-3 flex flex-col gap-4'>
      <div className='flex-1 flex gap-2'>
        <div className='h-40 w-full bg-black rounded-xl' />
        <div className='space-y-2 text-end w-full'>
          <p className='text-2xl font-medium'>₦{data?.price}</p>
          <h3 className='text-xl text-stone-600 font-semibold'>
            {data?.title}
          </h3>
          <p className='text-[15px] text-center'>{data?.decsription}</p>
        </div>
      </div>
      <div
        className='flex gap-2 w-full'
        onClick={() => addToCart({ id: data?.id || "", quantity: 1 })}>
        <button className='btn-outline'>Add to Cart</button>
        <button className='btn' onClick={orderNow}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ItemComponent;
