import React from 'react';

function OneTime() {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="border shadow-lg rounded-xl sm:w-1/3 ">
        <div className=" px-2 pt-3 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold py-2 ">One Time</h3>
          <h1 className=" py-2 text-4xl font-bold">$12</h1>
          <h3 className="text-lg py-2">per one time</h3>
          <button className="text-xl bg-primary px-3 py-2 rounded-lg">
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
