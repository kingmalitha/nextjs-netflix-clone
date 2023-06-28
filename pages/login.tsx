/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "@/components/Loader";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
    setIsLoading(false);
  };

  const toggleLogin = () => {
    setLogin(!login);
  };

  const handleDetailsShow = () => {
    setDetails(true);

    setTimeout(() => {
      setDetails(false);
    }, 10000);
  };

  return (
    <div className='relative flex h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        src='https://res.cloudinary.com/dorssd7la/image/upload/v1681836665/login_page_qyvcx8.jpg'
        className='-z-10 !hidden opacity-60 sm:!inline'
        fill={true}
        style={{ objectFit: "cover" }}
        alt=''
      />
      <img
        src='https://res.cloudinary.com/dorssd7la/image/upload/v1681865518/Netflix_2015_logo_bmilkq.svg'
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
        width={150}
        height={150}
        alt=''
      />

      {/* {login ? <div>Login Form</div> : <div>Sign Up Form</div>} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
      >
        <h1 className='text-4xl  font-semibold'>
          {login ? "Sign In" : "Sign Up"}
        </h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className='input'
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Please enter a valid email{" "}
              </p>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='Password'
              className='input'
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Please enter the password{" "}
              </p>
            )}
          </label>
        </div>
        <button
          className='w-full rounded bg-[#e50914] py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed '
          disabled={!isValid || isLoading}
        >
          {isLoading ? <Loader /> : <div> {login ? "Sign In" : "Sign Up"}</div>}
        </button>

        {login && (
          <div className='flex justify-between items-center'>
            <label className='text-[gray] text-sm'>
              <input
                type='checkbox'
                defaultChecked
                className='checked:border-gray-500 checked:bg-gray-500'
              />{" "}
              Remember me
            </label>
            <Link href='/LoginHelp'>
              <button className='text-[gray] text-sm hover:underline text-right'>
                Need help?
              </button>
            </Link>
          </div>
        )}

        <div className='text-[gray]'>
          {login ? "New to Netflix?" : "Already have an account?"}{" "}
          <button
            onClick={toggleLogin}
            type='submit'
            className='text-white hover:underline'
          >
            {login ? "Sign Up Now." : "Log In Now."}
          </button>
        </div>

        <div className='text-xs text-[gray]'>
          <p>
            This page is protected by Google reCAPTCHA to ensure you&apos;re not
            a bot.{" "}
            {!details ? (
              <button
                className='text-blue-500 hover:underline'
                onClick={handleDetailsShow}
              >
                Learn more.
              </button>
            ) : (
              <p className='mt-5'>
                The information collected by Google reCAPTCHA is subject to the
                Google{" "}
                <a
                  href='https://policies.google.com/privacy'
                  className='hover:underline text-blue-500'
                >
                  Privacy Policy{" "}
                </a>
                and{" "}
                <a
                  href='https://policies.google.com/terms'
                  className='hover:underline text-blue-500'
                >
                  Terms of Service
                </a>
                , and is used for providing, maintaining, and improving the
                reCAPTCHA service and for general security purposes (it is not
                used for personalized advertising by Google).
              </p>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
