"use client";

import Checkbox from "./Checkbox";
import { InputTemp, InputTextarea } from "./InputTemp";
import { profileVS, ProfileFormValues } from "@lib/validation";
import { Customer } from "@/server/db/schema";
import useSwr from "swr";
import { client } from "@/server/client";
import { useStore } from "../../store/store";
import { useSSR } from "@lib/hooks";
import { OrderT } from "../../t";
import { initialState } from "../../store/orderSlice";
import useMutate from "swr/mutation";
import { LoadingBlur } from "./Loading";
import { useSession } from "@lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CheckoutComp = ({ customer }: { customer?: Customer }) => {
  const session = useSession();

  const noSSROrder = useStore((state) => state.order);
  const { items: orderItems, orderDetails }: OrderT = useSSR()
    ? noSSROrder
    : initialState;

  const formIv = {
    name: customer?.fullName || orderDetails.name,
    phone: customer?.phone || orderDetails.phone,
    location: customer?.location || orderDetails.location,
    notes: customer ? orderDetails.notes : "",
    createAccount: false,
  };

  const {
    data: checkoutData,
    isLoading,
    error,
  } = useSwr(
    orderItems.length > 0 ? [`item.metadata`, orderItems] : null,
    async () => await client.order.checkout.query({ items: orderItems }),
    { shouldRetryOnError: false }
  );

  // const { trigger, isMutating, data } = useMutate(
  //   "test",
  //   async () =>
  //     await client.item.test.mutate({
  //       email: "emmanueosayame@gmail.com",
  //       location: "Uniben",
  //       fullName: "Emmanuel Osayame",
  //       phone: "09159114491",
  //       uid: "useru87y3h66g7ygyg8t",
  //     })
  // );

  // const {} = useMutate("place-order",async()=>client.order.)
  const placeOrder = () => {};

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<
    Omit<ProfileFormValues, "email"> & {
      createAccount: boolean;
      notes?: string;
    }
  >({
    defaultValues: formIv,
    resolver: zodResolver(
      profileVS.omit({ email: true }).extend({
        createAccount: z.boolean(),
        notes: z.string().max(200, "too long").optional(),
      })
    ),
  });

  return (
    <form onSubmit={handleSubmit(placeOrder)} className='space-y-4'>
      {/* {isMutating && (
            <p className='absolute top-20 left-20 text-red-500 z-50'>loading</p>
          )} */}
      {/* <LoadingBlur /> */}
      <div className='bg-white w-full rounded-lg p-3 space-y-2'>
        {!session && (
          <div className='flex gap-3'>
            <Checkbox
              checked={getValues("createAccount")}
              handleChange={() => {
                setValue("createAccount", !getValues("createAccount"), {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
            />

            <p>Also create a Profile for me</p>
          </div>
        )}
        <h2 className='font-semibold'>Billing Details</h2>
        {/* <button className='btn' onClick={() => trigger()}>
              Click
            </button> */}
        <InputTemp
          label='Name'
          placeholder='John'
          required
          error={errors.fullName?.message?.toString()}
          touched={touchedFields.fullName}
          {...register("fullName")}
        />
        <InputTemp
          label='Phone'
          required
          error={errors.phone?.message?.toString()}
          touched={touchedFields.phone}
          placeholder='080...'
          {...register("phone")}
        />
        <InputTemp
          label='Location'
          required
          error={errors.location?.message?.toString()}
          touched={touchedFields.location}
          placeholder='e.g. Uniben'
          {...register("location")}
        />
        <InputTextarea
          label='Notes (optional)'
          error={errors.notes?.message?.toString()}
          touched={touchedFields.notes}
          {...register("notes")}
          placeholder='additional notes...'
        />
      </div>

      <div className='bg-white w-full rounded-lg overflow-hidden min-h-[150px] p-2 space-y-2 relative flex flex-col'>
        {isLoading && <LoadingBlur />}
        <div className=' w-full flex-1'>
          <h2 className='font-semibold'>Order Review</h2>
          <div className='flex flex-col p-2 gap-1'>
            {checkoutData?.items?.map((item) => (
              <div
                className='border rounded-lg py-2 px-4 flex justify-between'
                key={item.id}>
                <h2>{item.title}</h2>
                <p>
                  ₦{item.price} * <span>{item.quantity}</span>{" "}
                </p>
              </div>
            ))}
          </div>
        </div>
        <h3 className='text-lg font-semibold'>
          Total:{" "}
          <span className='text-xl text-red-500'>₦ {checkoutData?.total}</span>
        </h3>
        <button className='btn' type='submit'>
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutComp;
