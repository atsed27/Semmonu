import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <span className="loader">
        <span className="bg-gray-700 loader_ball"></span>
        <span className="bg-gray-700 loader_ball"></span>
        <span className="bg-gray-700 loader_ball"></span>
      </span>
    </div>
  );
}

export default Loader;
