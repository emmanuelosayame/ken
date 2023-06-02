"use client";

import Checkbox from "@/components/Checkbox";
import { InputTemp, InputTextarea } from "@/components/InputTemp";
import { checkoutVS } from "@lib/validation";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const router = useRouter();
  const user = null;

  const placeOrder = () => {};

  return (
    <div className='w-full px-5'>
      <h1 className='text-xl font-semibold'>Checkout</h1>
      {!user && (
        <div className='flex gap-2 w-full my-2'>
          <p className='mx-2'>Returning Customer ?</p>
          <button
            className='underline text-base text-white'
            onClick={() => router.push("/login")}>
            login
          </button>
        </div>
      )}

      <Formik
        initialValues={{}}
        onSubmit={placeOrder}
        validationSchema={checkoutVS}
        enableReinitialize>
        {({ getFieldProps, submitForm, touched, errors, dirty }) => (
          <Form className='space-y-4'>
            <div className='bg-white w-full rounded-lg p-3 space-y-2'>
              <div className='flex gap-3'>
                <Checkbox checked handleChange={() => {}} />

                <p>Also create an account for me</p>
              </div>
              <h2 className='font-semibold'>Billing Details</h2>
              <InputTemp label='Name' required />
              <InputTemp label='Phone' required />
              <InputTemp label='Location' required placeholder='e.g. Uniben' />
              <InputTextarea label='Notes (optional)' />
            </div>

            <div className='bg-white w-full rounded-lg p-3 space-y-2'>
              <div className='h-40 w-full'>
                <h2 className='font-semibold'>Order Review</h2>
              </div>
              <button className='btn' type='submit'>
                Proceed
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutPage;
