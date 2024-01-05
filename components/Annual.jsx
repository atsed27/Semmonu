import { Store } from '@/utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

function Annual() {
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
    <div className="grid md:grid-cols-3 gap-5 mt-10 ">
      <div
        className={
          panelMethod === 'basicY'
            ? 'border-2 shadow-lg rounded-xl bg-slate-300'
            : 'border-2 shadow-lg rounded-xl hover:bg-slate-100'
        }
      >
        <div className=" px-2 pt-3 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold py-2 ">Basic</h3>
          <h1 className=" py-2 text-4xl font-bold">$300</h1>
          <h3 className="text-lg py-2">per annual</h3>
          <button
            onClick={() => handleSelectClick('basicY')}
            className="text-xl bg-primary px-3 py-2 rounded-lg"
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
          panelMethod === 'proY'
            ? 'border-2 shadow-lg rounded-xl bg-slate-300'
            : 'border-2 shadow-lg rounded-xl hover:bg-slate-100'
        }
      >
        <div className=" px-2 pt-3 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold py-2 ">Pro</h3>
          <h1 className=" py-2 text-4xl font-bold">$550</h1>
          <h3 className="text-lg py-2">per annual</h3>
          <button
            onClick={() => handleSelectClick('proY')}
            className="text-xl bg-primary px-3 py-2 rounded-lg"
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
          panelMethod === 'proMaxY'
            ? 'border-2 shadow-lg rounded-xl bg-slate-300'
            : 'border-2 shadow-lg rounded-xl hover:bg-slate-100'
        }
      >
        <div className=" px-2 pt-3 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold py-2 ">Pro Max</h3>
          <h1 className=" py-2 text-4xl font-bold">$880</h1>
          <h3 className="text-lg py-2">per annual</h3>
          <button
            onClick={() => handleSelectClick('proMaxY')}
            className="text-xl bg-primary px-3 py-2 rounded-lg"
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

export default Annual;
