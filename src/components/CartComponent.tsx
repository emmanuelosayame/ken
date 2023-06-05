"use client";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/store";
import { useState } from "react";
import { Content, Overlay, Portal } from "@radix-ui/react-dialog";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import Checkbox from "./Checkbox";
import sum from "lodash/sum";
import { Cart } from "@/server/db/schema";
import useSwr from "swr";
import { client } from "@/server/client";
import { LoadingBlur } from "./Loading";

const CartComponent = ({
  rawCart,
  setOpen,
}: {
  rawCart: Cart[];
  setOpen: (state: boolean) => void;
}) => {
  const router = useRouter();

  const requestKey = rawCart.map(({ id }) => ({ id }));

  const {
    data: metadata,
    isLoading,
    error,
  } = useSwr(
    rawCart.length > 0 ? ["item.metadata", requestKey] : null,
    async () =>
      await client.item.metadata.query({
        items: requestKey,
      }),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      // revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );

  const cart = rawCart.map((rc) => ({
    ...(metadata?.find((md) => md.id === rc.id) || {}),
    quantity: rc.quantity,
    id: rc.id,
  }));

  const modifyQ = useStore((state) => state.modifyQ);
  const remove = useStore((state) => state.removeItem);
  const removeItems = useStore((state) => state.removeItems);
  const addOrderItems = useStore((state) => state.addOrderItems);

  const [selected, setSelected] = useState<number[]>([]);

  const getChecked = (id: number) => !!selected.find((item) => item === id);

  const total = sum(
    selected.map((item) => {
      const realTimeData = cart?.find((cartItem) => cartItem.id === item);
      if (realTimeData) {
        return (realTimeData.price || 0) * realTimeData.quantity;
      } else setSelected((state) => state.filter((id) => id !== item));
    })
  );

  const checkout = () => {
    addOrderItems(
      selected.map((id) => ({
        id,
        quantity: cart.find((x) => x.id === id)?.quantity || 1,
      }))
    );
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <Portal>
      <Overlay className='fixed inset-0 z-40 bg-black/20 backdrop-blur-lg' />
      <Content className='overflow-hidden w-full z-50 p-4 fixed center-x top-28'>
        {isLoading && <LoadingBlur />}
        <div className='bg-white rounded-xl p-4 shadow-md'>
          <div className='flex gap-5'>
            <h2 className='text-lg font-semibold'>Cart</h2>
            <button
              className='text-red-400'
              onClick={() =>
                setSelected((state) =>
                  state.length > 0 ? [] : cart.map((x) => x.id)
                )
              }>
              select all
            </button>
            <button
              disabled={selected.length < 1}
              className='disabled:opacity-40'
              onClick={() => removeItems(selected)}>
              <TrashIcon width={23} />
            </button>
          </div>
          <div className='border-b border-b-gray-300 w-full my-1' />
          <div className='flex flex-col gap-3 pt-2 min-h-[80px] max-h-[500px] overflow-auto'>
            {cart.map((cartItem, index) => {
              const checked = getChecked(cartItem.id);

              return (
                <div key={index} className='flex gap-3 items-center'>
                  <Checkbox
                    checked={checked}
                    handleChange={() => {
                      if (checked) {
                        setSelected((state) =>
                          state.filter((id) => id !== cartItem.id)
                        );
                      } else {
                        setSelected((state) => [
                          ...state.filter((id) => id !== cartItem.id),
                          cartItem.id,
                        ]);
                      }
                    }}
                  />
                  <div>
                    <div className='w-14 h-14 bg-black rounded-md' />
                  </div>
                  <div className='flex flex-col gap-1 flex-1'>
                    <h2>{cartItem?.title}</h2>
                    {/* <span>|</span> */}
                    <p>₦ {cartItem?.price}</p>
                  </div>

                  <div className='flex items-center justify-between '>
                    <button
                      className='bg-neutral-700 flex items-center justify-center
                   rounded-lg h-5 md:h-7 w-5 md:w-7 text-white shadow-md disabled:opacity-70'
                      aria-label='decreament-item'
                      disabled={cartItem.quantity < 2}
                      onClick={() =>
                        modifyQ(cartItem.id, cartItem.quantity - 1)
                      }>
                      <MinusIcon width={18} stroke='white' />
                    </button>
                    <input
                      className='w-6 text-center text-[17px]'
                      value={cartItem.quantity}
                      onChange={(e) =>
                        modifyQ(cartItem.id, Number(e.target.value))
                      }
                      type='number'
                    />
                    <button
                      className='bg-red-300 flex items-center justify-center
                   rounded-lg h-6 md:h-7 w-6 text-red-600 shadow-md disabled:opacity-70'
                      aria-label='decreament-item'
                      disabled={cartItem.quantity > 10}
                      onClick={() =>
                        modifyQ(cartItem.id, cartItem.quantity + 1)
                      }>
                      <PlusIcon width={18} />
                    </button>
                  </div>
                  <button onClick={() => remove(cartItem.id)}>
                    <TrashIcon width={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className='bg-white rounded-xl p-4 mt-4 space-y-3 shadow-md'>
          <h3 className='text-lg'>Total: {total}</h3>
          <button
            disabled={selected.length < 1}
            className='bg-black rounded-lg py-3 w-full text-white disabled:opacity-20'
            onClick={checkout}>
            Checkout
          </button>
        </div>
      </Content>
    </Portal>
  );
};

export default CartComponent;
