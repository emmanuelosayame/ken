"use client";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/store";
import { Item } from "@/server/db/schema";
import { m } from "framer-motion";

const ItemComponent = ({ data }: { data: Item }) => {
  const router = useRouter();

  // const ref = useRef<HTMLDivElement>(null);

  const user = null;

  const addToCart = useStore((state) => state.addToCart);

  const addOrderItem = useStore((state) => state.addOrderItems);

  const orderNow = () => {
    addOrderItem([{ id: data.id, quantity: 1 }]);
    router.push("/checkout");
  };

  return (
    <m.div
      initial={{ opacity: 0.4, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      // viewport={{ amount: 0.5 }}
      transition={{
        ease: "easeOut",
        delay: 0.2,
      }}
      className='col-span-1 bg-white rounded-lg p-3 flex flex-col gap-4 h-96'>
      <div className='flex-1 flex gap-2 dark:text-black relative'>
        <div className=' w-full bg-black/80 rounded-xl' />
        <div className='absolute top-5 right-4 space-y-2 text-end text-white w-1/2'>
          <p className='text-2xl font-medium'>₦{data?.price}</p>
          <h3 className='text-lg text-stone-100 font-medium'>{data?.title}</h3>
          <p className='text-sm'>{data?.description}</p>
        </div>
      </div>
      <div className='flex gap-2 w-full'>
        <button
          className='btn-outline'
          onClick={() => addToCart({ id: data.id, quantity: 1 })}>
          Add to Cart
        </button>
        <button className='btn' onClick={orderNow}>
          Order Now
        </button>
      </div>
    </m.div>
  );
};

export default ItemComponent;
