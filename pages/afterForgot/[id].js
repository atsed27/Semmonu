import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
function AfterForgot() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { query } = router;
  const id = query.id;
  console.log(query);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ password }) => {
    console.log(password);
    try {
      setLoading(true);
      await axios.put('/api/auth/finduser', { id, password });
      setLoading(false);
      toast.success('password is update successfully');
      router.push('/login');
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        toast.error('use this password before');
      }
      toast.error(getError(error));
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container px-4 m-auto mt-4 ">
        <Link href={'/login'}>back</Link>
        <div className="flex flex-col items-center justify-center">
          <p></p>
          <form
            className="px-5 py-5 mx-2 mt-16 mb-5 rounded-lg shadow-xl sm:mt-24 lg:mt-36 shadow-gray-200"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="py-2 text-xl font-bold">Forgot Your Password ? </h1>
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
                className="w-full"
                id="password"
              ></input>
              {errors.password && (
                <div className="text-red-600">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please enter your Confirm password',
                  validate: (value) => value === getValues('password'),
                  minLength: {
                    value: 6,
                    message: 'password more than 5 chars',
                  },
                })}
                className="w-full"
                id="confirmPassword"
              ></input>
              {errors.confirmPassword && (
                <div className="text-red-600">
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <div className="text-red-600">Password do not match</div>
                )}
            </div>
            <div className="mb-5 bg-primary">
              <h3 className="text-center">
                <button className="px-10 py-1 text-xl font-semibold">
                  {loading === true ? (
                    <div>Loading ... </div>
                  ) : (
                    'Change Password'
                  )}
                </button>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AfterForgot;
