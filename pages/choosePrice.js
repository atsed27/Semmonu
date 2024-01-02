import Annual from '@/components/Annual';
import Layout from '@/components/Layout';
import Month from '@/components/Month';
import OneTime from '@/components/OneTime';
import React, { useState } from 'react';

function ChoosePrice() {
  const [cardSelect, setCardSelect] = useState('month');
  return (
    <Layout title={'choose-price'}>
      <div className="container m-auto mt-4 px-4  mb-9 ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl  my-3 font-semibold max-w-xl">
            Choose Pricing that Right For You
          </h1>
          <div className="flex items-center border rounded-full px-2 bg-slate-200 mt-3 py-3">
            <button
              onClick={() => setCardSelect('one')}
              className={
                cardSelect === 'one'
                  ? ' bg-primary rounded-full mx-3 px-3 py-2 '
                  : 'text-blue-500 mx-3'
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
