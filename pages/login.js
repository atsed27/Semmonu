/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import React, { useEffect } from 'react';
import Google from '../public/Image/google.png';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session?.user]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res.error) {
        toast.error(res.error);
      }
      console.log(res);
    } catch (error) {
      toast.error(getError(error));
      console.log(error);
    }
  };
  return (
    <Layout title={'login'}>
      <div className="container m-auto mt-4 px-4">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className=" mx-2 mt-16 mb-5 sm:mt-24 lg:mt-36 px-5 py-5  shadow-xl shadow-gray-200 rounded-lg"
          >
            <h1 className="text-2xl py-3 text-center font-bold">
              welcome back
            </h1>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email address',
                  },
                })}
                className="w-full rounded"
                id="email"
                autoFocus
              />
              {errors.email && (
                <div className="text-red-600"> {errors.email.message} </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: {
                    value: 6,
                    message: 'password more than 5 chars',
                  },
                })}
                className="w-full rounded"
                id="password"
              />
              {errors.password && (
                <div className="text-red-600">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-right">
                <button className="text-md font-semibold">
                  Forgot Password
                </button>
              </h3>
            </div>
            <div className="mb-5 bg-primary">
              <h3 className="text-center">
                <button className="text-xl   py-1 px-10 font-semibold">
                  Log In
                </button>
              </h3>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className=" w-1/3">
                <hr className="text-xl text-green-400" />
              </div>
              <div className="">
                <h2 className="text-center">or Log In</h2>
              </div>
              <div className="w-1/3">
                <hr className="text-3xl " />
              </div>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <button className="border rounded-md mr-3 pl-3 pr-2 py-2">
                <Image
                  className=""
                  src={Google}
                  alt="google"
                  width={25}
                  height={25}
                />
              </button>
              <button className="border rounded-md mr-3 pl-3 pr-2 py-2">
                <Image
                  className=""
                  src={Google}
                  alt="google"
                  width={25}
                  height={25}
                />
              </button>
            </div>
            <div className="mb-4 text-lg sm:text-xl flex items-center justify-center">
              don&apos;t an account?&nbsp;
              <Link href="/register" className="text-green-500">
                sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
