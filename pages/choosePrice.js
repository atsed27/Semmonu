import Layout from '@/components/Layout';
import Month from '@/components/Month';
import React from 'react';

function ChoosePrice() {
  return (
    <Layout title={'choose-price'}>
      <div className="container m-auto mt-4 px-4  mb-9 ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold max-w-xl">
            Choose Pricing that Right For You
          </h1>
          <div className="flex items-center border rounded-full px-2 bg-slate-200 mt-3 py-1">
            <button className="text-blue-500 mr-2">One Time</button>
            <button className="mr-2 bg-primary rounded-full  px-2 py-2 pr-5">
              Monthly
            </button>
            <button className="text-blue-500">Annual</button>
          </div>
        </div>
        <Month />
      </div>
    </Layout>
  );
}

export default ChoosePrice;
