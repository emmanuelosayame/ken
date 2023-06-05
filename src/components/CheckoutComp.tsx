"use client";

import { Form, Formik } from "formik";
import Checkbox from "./Checkbox";
import { InputTemp, InputTextarea } from "./InputTemp";
import { checkoutVS } from "@lib/validation";
import { Customer } from "@/server/db/schema";
import useSwr from "swr";
import { client } from "@/server/client";
import { useStore } from "../../store/store";
import { useSSR } from "@lib/helpers";
import { OrderT } from "../../t";
import { initialState } from "../../store/orderSlice";
import useMutate from "swr/mutation";
import { LoadingBlur } from "./Loading";

const CheckoutComp = ({ customer }: { customer?: Customer }) => {
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

  // console.log(orderItems);

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

  // console.log(data);

  const placeOrder = () => {};

  return (
    <Formik
      initialValues={formIv}
      onSubmit={placeOrder}
      validationSchema={checkoutVS}
      enableReinitialize>
      {({ getFieldProps, touched, errors, dirty, values, setFieldValue }) => (
        <Form className='space-y-4'>
          {/* {isMutating && (
            <p className='absolute top-20 left-20 text-red-500 z-50'>loading</p>
          )} */}
          {/* <LoadingBlur /> */}
          <div className='bg-white w-full rounded-lg p-3 space-y-2'>
            <div className='flex gap-3'>
              <Checkbox
                checked={values.createAccount}
                handleChange={() => {
                  setFieldValue("createAccount", !values.createAccount);
                }}
              />

              <p>Also create an account for me</p>
            </div>
            <h2 className='font-semibold'>Billing Details</h2>
            {/* <button className='btn' onClick={() => trigger()}>
              Click
            </button> */}
            <InputTemp
              label='Name'
              placeholder='John'
              required
              {...getFieldProps("name")}
            />
            <InputTemp
              label='Phone'
              required
              placeholder='080...'
              {...getFieldProps("phone")}
            />
            <InputTemp
              label='Location'
              required
              placeholder='e.g. Uniben'
              {...getFieldProps("location")}
            />
            <InputTextarea
              label='Notes (optional)'
              {...getFieldProps("notes")}
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
              <span className='text-xl text-red-500'>
                ₦ {checkoutData?.total}
              </span>
            </h3>
            <button className='btn' type='submit'>
              Pay
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutComp;
