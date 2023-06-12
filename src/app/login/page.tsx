"use client";

import { InputTemp } from "@/components/InputTemp";
import { supabase } from "@lib/supabase";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { createPVS } from "@lib/validation";
import { AuthError } from "@supabase/supabase-js";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleSvg } from "@lib/Svg";

const formIv = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const [vis, setVis] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const login = async ({ email, password }: typeof formIv) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error);
    } else {
      router.replace("/");
    }
  };

  const loginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "/menu" },
    });
  };

  return (
    <div className='flex flex-col h-full min-h-screen p-5'>
      <div className='flex justify-between'>
        <button onClick={() => router.push("/")}>
          <ArrowLeftIcon width={30} />
        </button>
      </div>
      <h1 className='text-xl font-semibold my-2'>Login to your Profile</h1>

      <Formik
        initialValues={formIv}
        onSubmit={login}
        validationSchema={createPVS.pick(["email", "password"])}
        enableReinitialize>
        {({ getFieldProps, touched, errors }) => (
          <Form className=' bg-white rounded-lg p-3 mt-40 space-y-3 shadow-sm'>
            {error && (
              <p className='text-sm text-red-500 text-center'>
                {error.message}
              </p>
            )}
            <div className='space-y-2 mb-5'>
              <InputTemp
                label='Email'
                required
                type='email'
                error={errors.email}
                touched={touched.email}
                placeholder='@mail.com'
                {...getFieldProps("email")}
              />
              <div className='relative'>
                <InputTemp
                  label='Password'
                  required
                  error={errors.password}
                  touched={touched.password}
                  // placeholder='e.g. Uniben'
                  {...getFieldProps("password")}
                  type={!vis ? "password" : "text"}
                />
                <button
                  className='absolute right-2 top-7'
                  type='button'
                  onClick={() => setVis((x) => !x)}>
                  {!vis ? <EyeSlashIcon width={24} /> : <EyeIcon width={24} />}
                </button>
              </div>
            </div>

            <button className='btn' type='submit'>
              Login
            </button>

            <button
              className='btn-outline gap-4'
              type='button'
              onClick={loginGoogle}>
              <GoogleSvg />
              <p>Continue with Google</p>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
