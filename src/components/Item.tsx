"use client";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/store";
import { Item } from "@/server/db/schema";
import { useInView, useAnimate } from "framer-motion";
import { useEffect } from "react";

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

  const [ref, animate] = useAnimate();

  const inView = useInView(ref, { amount: 0.3, once: false });

  useEffect(() => {
    if (inView) {
      animate(ref.current, {
        opacity: 1,
        scale: 1,
        ease: "backIn",
        duration: 0.4,
        type: "spring",
        stiffness: 50,
      });
    } else {
      animate(ref.current, {
        scale: 0,
      });
    }
  }, [animate, inView, ref]);

  return (
    <div
      ref={ref}
      className='col-span-1 bg-white rounded-lg p-3 flex flex-col gap-4'>
      <div className='flex-1 flex gap-2 dark:text-black'>
        <div className='h-40 w-full bg-black rounded-xl' />
        <div className='space-y-2 text-end w-full'>
          <p className='text-2xl font-medium'>₦{data?.price}</p>
          <h3 className='text-xl text-stone-800 font-medium'>{data?.title}</h3>
          <p className='text-[15px] text-center'>{data?.description}</p>
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
    </div>
  );
};

export default ItemComponent;
