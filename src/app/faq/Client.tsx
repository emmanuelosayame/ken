"use client";

import { InputTemp, InputTextarea } from "@/components/InputTemp";
import { LoadingBlur } from "@/components/Loading";
import { client } from "@/server/client";
import { CreateContact, createContact } from "@/server/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "swr/mutation";

export const ContactForm = () => {
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
    mode: "all",
  });

  return (
    <div className='bg-white/80 dark:bg-black/80 border p-3 rounded-lg'>
      {isMutating && <LoadingBlur />}
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
  );
};
