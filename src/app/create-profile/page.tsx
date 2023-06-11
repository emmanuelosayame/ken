"use client";

import Checkbox from "@/components/Checkbox";
import { InputTemp } from "@/components/InputTemp";
import { client } from "@/server/client";
import { CustomerCreate } from "@/server/routers/customer";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { createPVS } from "@lib/validation";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RemoveScroll } from "react-remove-scroll";
import useMutate from "swr/mutation";

const SuccessScreen = () => {
  const router = useRouter();
  return (
    <RemoveScroll className='fixed z-40 bg-black/40 backdrop-blur-sm inset-0 flex justify-center items-center'>
      <div className='bg-white rounded-lg p-3 w-11/12 h-44 flex flex-col justify-between items-center'>
        <h2 className='text-xl text-green-500 font-medium text-center'>
          Profile Created
        </h2>

        <p>You need to confirm your email to login</p>
        <button
          className='text-white bg-stone-600 rounded-lg py-2 px-6 self-end'
          onClick={() => router.replace("/")}>
          Back Home
        </button>
      </div>
    </RemoveScroll>
  );
};

const formIv = {
  fullName: "",
  location: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTC: false,
};

const NewUserPage = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [vis, setVis] = useState({ p: false, cp: false });

  const { trigger } = useMutate(
    "customer",
    async (_, { arg }: { arg: CustomerCreate }) =>
      await client.customer.create.mutate({ data: arg }),
    {
      onSuccess: () => {
        setOpen(true);
      },
    }
  );

  const createAccount = (values: typeof formIv) => {
    const { agreeTC, confirmPassword, ...rest } = values;
    if (!agreeTC) return;
    trigger(rest);
  };

  return (
    <div className='flex flex-col h-full min-h-screen p-5 gap-3'>
      {open && <SuccessScreen />}
      <div className='flex justify-between'>
        <button onClick={() => router.back()}>
          <ArrowLeftIcon width={30} />
        </button>
      </div>
      <h1 className='text-xl font-semibold'>Create Profile</h1>

      <Formik
        initialValues={formIv}
        onSubmit={createAccount}
        validationSchema={createPVS}
        enableReinitialize>
        {({
          getFieldProps,
          touched,
          errors,
          isValid,
          values,
          setFieldValue,
        }) => (
          <Form className='space-y-7 bg-white rounded-lg p-3 my-auto'>
            <div className=' w-full space-y-2'>
              <InputTemp
                label='Name'
                placeholder='John'
                required
                error={errors.fullName}
                touched={touched.fullName}
                {...getFieldProps("fullName")}
              />
              <InputTemp
                label='Email'
                required
                type='email'
                error={errors.email}
                touched={touched.email}
                placeholder='@mail.com'
                {...getFieldProps("email")}
              />
              <InputTemp
                label='Phone'
                required
                type='tel'
                error={errors.phone}
                touched={touched.phone}
                placeholder='080...'
                {...getFieldProps("phone")}
              />
              <InputTemp
                label='Location'
                type='text'
                required
                error={errors.location}
                touched={touched.location}
                placeholder='e.g. Uniben'
                {...getFieldProps("location")}
              />
              <div className='relative'>
                <InputTemp
                  label='Password'
                  required
                  error={errors.password}
                  touched={touched.password}
                  // placeholder='e.g. Uniben'
                  {...getFieldProps("password")}
                  type={!vis.p ? "password" : "text"}
                />
                <button
                  className='absolute right-2 top-7'
                  type='button'
                  onClick={() => setVis((x) => ({ cp: x.cp, p: !x.p }))}>
                  {!vis.p ? (
                    <EyeSlashIcon width={24} />
                  ) : (
                    <EyeIcon width={24} />
                  )}
                </button>
              </div>
              <div className='relative'>
                <InputTemp
                  label='Confirm Password'
                  required
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  // placeholder='e.g. Uniben'
                  {...getFieldProps("confirmPassword")}
                  type={!vis.cp ? "password" : "text"}
                  className='pr-10'
                />
                <button
                  type='button'
                  className='absolute right-2 top-7'
                  onClick={() => setVis((x) => ({ p: x.p, cp: !x.cp }))}>
                  {!vis.cp ? (
                    <EyeSlashIcon width={24} />
                  ) : (
                    <EyeIcon width={24} />
                  )}
                </button>
              </div>

              <div className='flex gap-2 items-center'>
                <Checkbox
                  checked={values.agreeTC}
                  handleChange={() => {
                    setFieldValue("agreeTC", !values.agreeTC);
                  }}
                />
                <p className='text-xs w-fit'>
                  You are indicating that you have read and agree to the{" "}
                  <Link href={"/legal"} className='text-blue-400'>
                    Terms of Use and Privacy Policy.
                  </Link>
                </p>
              </div>
              {errors.agreeTC && (
                <p className='text-xs text-center text-red-400'>
                  You must agree to our privacy policies
                </p>
              )}
            </div>

            <button className='btn' type='submit' disabled={!isValid}>
              Create Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewUserPage;
