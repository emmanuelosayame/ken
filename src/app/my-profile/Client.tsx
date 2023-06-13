"use client";
import { InputTemp } from "@/components/InputTemp";
import Select from "@/components/radix/Select";
import { Customer } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileVS, ProfileFormValues } from "@lib/validation";
import { Content, Root, Trigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const UserForm = ({ customer }: { customer: Customer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      email: customer.email,
      fullName: customer.email,
      location: customer.location,
      phone: customer.phone,
    },
    resolver: zodResolver(profileVS),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values);
        })}
        className='p-3 bg-white rounded-lg m-3 space-y-3'>
        <InputTemp
          label='Name'
          {...register("fullName")}
          touched={touchedFields.fullName}
          error={errors.fullName?.message?.toString()}
        />
        <InputTemp
          label='Email'
          {...register("email")}
          touched={touchedFields.email}
          error={errors.email?.message?.toString()}
        />
        <InputTemp
          label='Phone Number'
          {...register("phone")}
          touched={touchedFields.phone}
          error={errors.phone?.message?.toString()}
        />
        <InputTemp
          label='Location'
          {...register("location")}
          touched={touchedFields.location}
          error={errors.location?.message?.toString()}
        />

        <button className='btn' type='submit'>
          Save
        </button>
      </form>

      <div className='p-5'>
        <button className='btn bg-red-400'>Delete My Profile</button>
      </div>
    </>
  );
};
