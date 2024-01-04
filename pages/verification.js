import Layout from '@/components/Layout';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function Verification() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ number, number2, number3, number4 }) => {
    setLoading(true);
    console.log(number, number2, number3, number4);
    setLoading(false);
  };
  return (
    <Layout title={'verification'}>
      <div className="container px-4 m-auto mt-4 ">
        <Link href={'/forget'}>back</Link>
        <div className="flex flex-col items-center justify-center">
          <p></p>
          <form
            className="px-5 py-5 mx-2 mt-16 mb-5 rounded-lg shadow-xl sm:w-1/2 sm:mt-24 lg:mt-36 shadow-gray-200"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="py-2 text-xl md:text-3xl font-bold">
              Enter verification code{' '}
            </h1>
            <p className="py-2">Enter code that we have sent to your email</p>
            <div className="flex items-center justify-center w-full">
              <div className="my-4 flex items-center justify-center">
                <input
                  type="number"
                  {...register('number', {
                    required: 'Please enter Number input 1',
                  })}
                  className="w-3/4 bg-gray-200  lg:w-1/2  rounded-lg"
                  autoFocus
                  id="number"
                ></input>
              </div>{' '}
              <div className="my-4 flex items-center justify-center">
                <input
                  type="number"
                  {...register('number2', {
                    required: 'Please enter Number input 2',
                  })}
                  className="w-3/4 lg:w-1/2 bg-gray-200 rounded-lg"
                  id="number2"
                ></input>
              </div>{' '}
              <div className="my-4 flex items-center justify-center">
                <input
                  type="number"
                  {...register('number3', {
                    required: 'Please enter Number input 3',
                  })}
                  className="w-3/4 lg:w-1/2 bg-gray-200 rounded-lg"
                  id="number3"
                ></input>
              </div>{' '}
              <div className="my-4 flex items-center justify-center">
                <input
                  type="number"
                  {...register('number4', {
                    required: 'Please enter Number input 4',
                  })}
                  className="w-3/4 lg:w-1/2 bg-gray-200  rounded-lg"
                  id="number4"
                ></input>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {errors.number &&
                errors.number2 &&
                errors.number3 &&
                errors.number4 && (
                  <div className="text-red-600">Enter the Number</div>
                )}
            </div>

            <div className="mb-5 mt-4  flex items-center justify-center ">
              <button className="px-16 py-1 text-xl bg-primary font-semibold">
                {loading === true ? <div>Loading ... </div> : 'Verify'}
              </button>
            </div>
            <div className="flex items-center justify-center py-2">
              <button className="text-green-500">Resend Code</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Verification;
