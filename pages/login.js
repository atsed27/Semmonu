/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import React from 'react';
import Google from '../public/Image/google.png';
import Image from 'next/image';
import Link from 'next/link';

function Login() {
  return (
    <Layout title={'login'}>
      <div className="container m-auto mt-4 px-4">
        <div className="flex items-center justify-center">
          <div className=" mx-2 mt-16 mb-5 sm:mt-24 lg:mt-36 px-5 py-5  shadow-xl shadow-gray-200 rounded-lg">
            <h1 className="text-2xl py-3 text-center font-bold">
              welcome back
            </h1>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full rounded"
                id="email"
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input type="password" className="w-full rounded" id="password" />
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
            <div className="mb-4 text-xl flex items-center justify-center">
              dont an account ? {'  '}
              <Link href="/register" className="text-green-500">
                sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
