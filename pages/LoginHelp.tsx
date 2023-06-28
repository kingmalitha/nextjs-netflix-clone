/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
}

const LoginHelp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // await forgotPassword(data.email);
  };

  return (
    <div className='relative flex h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        src='https://res.cloudinary.com/dorssd7la/image/upload/v1682126162/netflix-forgotpage-bg_rdxlvy.jpg'
        className='-z-10 !hidden opacity-60 sm:!inline'
        fill={true}
        style={{ objectFit: "cover" }}
        alt=''
      />
      <header>
        <div className='flex items-center space-x-2 md:space-x-10'>
          <img
            src='https://rb.gy/ulxxee'
            width={100}
            height={100}
            alt='netflix-logo'
            className='cursor-pointer object-contain'
          />
        </div>
        <div className='flex items-center space-x-4 text-sm font-[400]'>
          <Link href='/login'>
            <button className='text-[#e50914] font-semibold md:text-xl hover:underline'>
              Sign In
            </button>
          </Link>
        </div>
      </header>
      <form className='relative mt-24 space-y-8 rounded bg-gray-200 text-black py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
        <h1 className='text-2xl  font-semibold'>Forgot Email/Password</h1>
        <div className='space-y-4'>
          <div>How would you like to reset your password?</div>

          <div>
            <input type='radio' id='email-select' checked />
            <label htmlFor='email-select'> Email</label>
          </div>
          <div>
            <input type='radio' id='phone-select' disabled />
            <label htmlFor='phone-select' className='text-[gray]'>
              {" "}
              Text Message (SMS)
            </label>
          </div>

          <div>
            <p className='text-sm'>
              We will send you an email with instructions on how to reset your
              password.
            </p>
          </div>

          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='name@example.com'
              className='w-full rounded bg-white px-5 py-3.5 placeholder-[gray] outline-none focus:bg-white/90'
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Please enter a valid email{" "}
              </p>
            )}
          </label>
          <button
            type='submit'
            className='w-full rounded bg-blue-500 text-white py-3 text-sm font-semibold'
          >
            Email Me
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginHelp;
