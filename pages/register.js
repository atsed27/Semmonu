/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import React, { useEffect, useReducer } from 'react';
import Google from '../public/Image/google.png';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'REGISTER_FILER':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function SignUp() {
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
  const [{ loading, error }, dispatch1] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  console.log(loading, error);
  const submitHandler = async ({ name, email, password }) => {
    try {
      dispatch1({ type: 'REGISTER_REQUEST' });
      const res = await axios.post('api/auth/signup', {
        name,
        email,
        password,
      });
      dispatch1({ type: 'REGISTER_SUCCESS' });
      console.log(res);
      toast.success('Register is successful');
      router.push('/login');
    } catch (error) {
      dispatch1({ type: 'REGISTER_FILER', payload: getError(error) });
      if (error.response.status === 404) {
        console.log(error.response.status);
        toast.error(error.response.data);
      }
      console.log(error);
      toast.error(getError(error));
    }
  };
  return (
    <Layout title={'register'}>
      <div className="container px-4 m-auto mt-4">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="px-5 py-5 mx-2 mt-16 mb-5 rounded-lg shadow-xl sm:mt-24 lg:mt-36 shadow-gray-200"
          >
            <h1 className="py-3 text-2xl font-bold text-center">
              Create Account
            </h1>
            <div className="mb-4">
              <label htmlFor="email"> Full Name</label>
              <input
                type="text"
                {...register('name', {
                  required: 'Please enter your name',
                })}
                className="w-full"
                id="name"
                autoFocus
              ></input>
              {errors.name && (
                <div className="text-red-600"> {errors.name.message} </div>
              )}
            </div>
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

            <div className="mb-5 bg-primary">
              <h3 className="text-center">
                <button className="px-10 py-1 text-xl font-semibold">
                  {loading === true ? <>loading...</> : <>Sign Up</>}
                </button>
              </h3>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-1/3 ">
                <hr className="text-xl text-green-400" />
              </div>
              <div className="">
                <h2 className="text-center">or Sign Up</h2>
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
              don&apos;t an account?&nbsp;
              <Link href={`/login?redirect=${redirect || '/'}`}>Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
