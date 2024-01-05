import { Store } from '@/utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

function OneTime() {
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { panelMethod } = ticket;
  console.log(panelMethod);
  const router = useRouter();
  const handleSelectClick = () => {
    const oneTime = 'oneTime';
    dispatch({ type: 'ADD_PANEL_METHOD', payload: oneTime });
    Cookies.set(
      'ticket',
      JSON.stringify({
        ...ticket,
        panelMethod: oneTime,
      })
    );
    router.push('/paySelect?message=panel');
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div
        className={
          panelMethod === 'oneTime'
            ? 'border shadow-lg rounded-xl sm:w-1/3 bg-slate-300'
            : 'border shadow-lg rounded-xl sm:w-1/3'
        }
      >
        <div className=" px-2 pt-3 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold py-2 ">One Time</h3>
          <h1 className=" py-2 text-4xl font-bold">$12</h1>
          <h3 className="text-lg py-2">per one time</h3>
          <button
            onClick={handleSelectClick}
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

export default OneTime;
