/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import Google from '../public/Image/google.png';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';
import Loader from '@/components/loader/Loader';

function Login() {
  const { status, data: session } = useSession();
  const router = useRouter();
  console.log(status);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
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
      {status === 'loading' ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="container h-screen px-4 m-auto mt-4">
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="px-5 py-5 mx-2 mt-16 mb-5 rounded-lg shadow-xl sm:mt-24 lg:mt-36 shadow-gray-200"
            >
              <h1 className="py-3 text-2xl font-bold text-center">
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
                  <Link href={'/forget'} className="font-semibold text-md">
                    Forgot Password
                  </Link>
                </h3>
              </div>
              <div className="mb-5 rounded-lg bg-primary">
                <h3 className="text-center">
                  <button className="px-10 py-1 text-xl font-semibold">
                    {loading === true ? <div>Loading ... </div> : 'Log In'}
                  </button>
                </h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-1/3 ">
                  <hr className="text-xl text-green-400" />
                </div>
                <div className="">
                  <h2 className="text-center ">or Log In</h2>
                </div>
                <div className="w-1/3">
                  <hr className="text-3xl " />
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button className="py-2 pl-3 pr-2 mr-3 border rounded-md">
                  <Image
                    className=""
                    src={Google}
                    alt="google"
                    width={25}
                    height={25}
                  />
                </button>
                <button className="py-2 pl-3 pr-2 mr-3 border rounded-md">
                  <Image
                    className=""
                    src={Google}
                    alt="google"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
              <div className="flex items-center justify-center mb-4 text-lg sm:text-xl">
                don&apos;t have an account?&nbsp;
                <Link href="/register" className="text-green-500">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Login;
