import { Store } from '@/utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

function Month() {
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { panelMethod } = ticket;

  const router = useRouter();
  const handleSelectClick = (value) => {
    dispatch({ type: 'ADD_PANEL_METHOD', payload: value });
    Cookies.set(
      'ticket',
      JSON.stringify({
        ...ticket,
        panelMethod: value,
      })
    );

    router.push('/paySelect?message=panel');
  };
  return (
    <div className="grid gap-5 mt-10 md:grid-cols-3 ">
      <div
        className={
          panelMethod === 'basic'
            ? 'border-2 shadow-lg rounded-xl bg-slate-300'
            : 'border-2 shadow-lg rounded-xl hover:bg-slate-100'
        }
      >
        <div className="flex flex-col items-center justify-center px-2 pt-3 ">
          <h3 className="py-2 text-xl font-bold ">Basic</h3>
          <h1 className="py-2 text-4xl font-bold ">$30</h1>
          <h3 className="py-2 text-lg">per month</h3>
          <button
            onClick={() => handleSelectClick('basic')}
            className="px-3 py-2 text-xl rounded-lg bg-primary"
          >
            Get Started Now
          </button>
          <p className="py-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis
          </p>
        </div>
        <div className="px-2 py-3">
          <ul className="text-left">
            <li>daniel</li>
            <li>daniel</li>
            <li>daniel</li>
          </ul>
        </div>
      </div>
      <div
        className={
          panelMethod === 'pro'
            ? 'border-2 shadow-lg rounded-xl  bg-slate-300'
            : 'border-2 shadow-lg rounded-xl hover:bg-slate-100 '
        }
      >
        <div className="flex flex-col items-center justify-center px-2 pt-3 ">
          <h3 className="py-2 text-xl font-bold ">Pro</h3>
          <h1 className="py-2 text-4xl font-bold ">$50</h1>
          <h3 className="py-2 text-lg">per month</h3>
          <button
            onClick={() => handleSelectClick('pro')}
            className="px-3 py-2 text-xl rounded-lg bg-primary"
          >
            Get Started Now
          </button>
          <p className="py-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis
          </p>
        </div>
        <div className="px-2 py-3">
          <ul className="text-left">
            <li>daniel</li>
            <li>daniel</li>
            <li>daniel</li>
          </ul>
        </div>
      </div>
      <div
        className={
          panelMethod === 'proMax'
            ? 'border-2 shadow-lg rounded-xl bg-slate-300'
            : 'border-2 shadow-lg rounded-xl hover:bg-slate-100'
        }
      >
        <div className="flex flex-col items-center justify-center px-2 pt-3 ">
          <h3 className="py-2 text-xl font-bold ">Pro Max</h3>
          <h1 className="py-2 text-4xl font-bold ">$80</h1>
          <h3 className="py-2 text-lg">per month</h3>
          <button
            onClick={() => handleSelectClick('proMax')}
            className="px-3 py-2 text-xl rounded-lg bg-primary"
          >
            Get Started Now
          </button>
          <p className="py-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis
          </p>
        </div>
        <div className="px-2 py-3">
          <ul className="text-left">
            <li>daniel</li>
            <li>daniel</li>
            <li>daniel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Month;
