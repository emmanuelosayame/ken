"use client";

import { InputTemp, InputTextarea } from "@/components/InputTemp";
import { LoadingBlur } from "@/components/Loading";
import { client } from "@/server/client";
import { CreateContact, createContact } from "@/server/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "swr/mutation";

// const formIv = {
//   name: "",
//   emailphone: "",
//   message: "",
// };

const FaqPage = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const { trigger, isMutating } = useMutation(
    ["contacts"],
    async (_, { arg }: { arg: CreateContact }) =>
      await client.contact.create.mutate(arg),
    {
      onSuccess: () => setStatus("success"),
      onError: () => setStatus("error"),
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<CreateContact>({
    resolver: zodResolver(createContact),
  });

  return (
    <div className='pt-10 w-[95%]'>
      {isMutating && <LoadingBlur />}
      <h1 className='text-xl font-semibold text-center'>
        Frequently Asked Questions
      </h1>

      <div className='list-disc ml-2 my-4'>
        <li className='text-base font-medium'>How to place an Order</li>
        <p className='text-sm ml-4 mb-2'>
          Ordering on our platform is very easy. You can order directly or
          create a profile, then select between delivery or carry out, choose
          your store, pick your favorite meal, pay and its done! If you need any
          help, feel free to call your store directly. See list of stores here.
        </p>

        <li className='text-base font-medium'>
          How much is your delivery fee?
        </li>
        <p className='text-sm ml-4 mb-2'>
          Delivery is absolutely free, however we only accept delivery for
          orders of 1’500 ₦ and above.
        </p>

        <li className='text-base font-medium'>
          Do you accept payment via bank transfer?
        </li>
        <p className='text-sm ml-4 mb-2'>
          Our payment options are: online payment, cash or POS.
        </p>

        <li className='text-base font-medium'>
          I am not satisfied with my purchase, what can I do?
        </li>
        <p className='text-sm ml-4 mb-2'>
          We are always Hungry to Be Better and love to hear from you. Write us
          an email: food@delorand.com with your feedback and we will make it
          right for you.
        </p>

        <li className='text-base font-medium'>
          Why should I create a Food Profile?
        </li>
        <p className='text-sm ml-4 mb-2'>
          {
            "Are you hungry and don't want to waste time? With your Pizza Profile on dominos.ng you can order pizza within seconds, access your last 5 orders and don’t need to type your address ever again."
          }
        </p>
      </div>

      <div className='bg-white/80 dark:bg-black/80 border p-3 rounded-lg'>
        <h2 className='text-lg font-medium text-center'>Contact Us</h2>

        {status === "success" ? (
          <p className='text-center py-20 px-2'>
            {"Thank you for contacting us, we'll get back to you soonest"}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit((values) => trigger(values))}
            className='space-y-2'>
            <InputTemp
              required
              label='Name'
              {...register("name")}
              touched={touchedFields.name}
              error={errors.name?.message?.toString()}
              maxLength={70}
            />
            <InputTemp
              required
              label='Email / Phone Number'
              {...register("emailphone")}
              touched={touchedFields.emailphone}
              error={errors.emailphone?.message?.toString()}
              maxLength={50}
            />
            <InputTextarea
              required
              label='Message'
              {...register("message")}
              touched={touchedFields.message}
              error={errors.message?.message?.toString()}
              maxLength={500}
            />

            <button className='btn w-full' type='submit'>
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
