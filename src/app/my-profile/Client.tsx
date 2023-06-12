"use client";
import { InputTemp } from "@/components/InputTemp";
import Select from "@/components/radix/Select";
import { Customer } from "@/server/db/schema";
import { createPVS } from "@lib/validation";
import { Content, Root, Trigger } from "@radix-ui/react-dialog";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

export const UserForm = ({ customer }: { customer: Customer }) => {
  return (
    <>
      <Formik
        initialValues={{
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          location: customer.location,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={createPVS.pick([
          "fullName",
          "email",
          "phone",
          "location",
        ])}>
        {({ getFieldProps, touched, errors }) => (
          <Form className='p-3 bg-white rounded-lg m-3 space-y-3'>
            <InputTemp
              label='Name'
              {...getFieldProps("fullName")}
              touched={touched.fullName}
              error={errors.fullName}
            />
            <InputTemp
              label='Email'
              {...getFieldProps("email")}
              touched={touched.email}
              error={errors.email}
            />
            <InputTemp
              label='Phone Number'
              {...getFieldProps("phone")}
              touched={touched.phone}
              error={errors.phone}
            />
            <InputTemp
              label='Location'
              {...getFieldProps("location")}
              touched={touched.location}
              error={errors.location}
            />

            <button className='btn' type='submit'>
              Save
            </button>
          </Form>
        )}
      </Formik>

      <div className='p-5'>
        <button className='btn bg-red-400'>Delete My Profile</button>
      </div>
    </>
  );
};
