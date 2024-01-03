import Annual from '@/components/Annual';
import Layout from '@/components/Layout';
import Month from '@/components/Month';
import OneTime from '@/components/OneTime';
import React, { useState } from 'react';
import Link from 'next/link';

function ChoosePrice() {
  const [cardSelect, setCardSelect] = useState('month');
  return (
    <Layout title={'choose-price'}>
      <div className="container px-4 m-auto mt-4 mb-9 ">
        <Link href={'/'}>back to home</Link>
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-xl my-3 text-2xl font-semibold sm:text-3xl">
            Choose Pricing that Right For You
          </h1>
          <div className="flex items-center px-2 py-3 mt-3 border rounded-full bg-slate-200">
            <button
              onClick={() => setCardSelect('one')}
              className={
                cardSelect === 'one'
                  ? ' bg-primary rounded-full sm:mx-3 px-3 py-2 '
                  : 'text-blue-500 sm:mx-3'
              }
            >
              One Time
            </button>
            <button
              onClick={() => setCardSelect('month')}
              className={
                cardSelect === 'month'
                  ? ' bg-primary rounded-full mx-3 px-3 py-2 '
                  : 'text-blue-500 mx-3'
              }
            >
              Monthly
            </button>
            <button
              onClick={() => setCardSelect('year')}
              className={
                cardSelect === 'year'
                  ? ' bg-primary rounded-full mx-3 px-3 py-2  '
                  : 'text-blue-500 mx-3'
              }
            >
              Annual
            </button>
          </div>
        </div>
        {cardSelect === 'month' && <Month />}
        {cardSelect === 'year' && <Annual />}
        {cardSelect === 'one' && <OneTime />}
      </div>
    </Layout>
  );
}

export default ChoosePrice;
