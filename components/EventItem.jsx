/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

function EventItem({ event }) {
  return (
    <div className="card">
      <Link href={`event/${event._id}`}>
        <img
          className="w-full rounded shadow h-80"
          src={event.image}
          alt={event.name}
        />
      </Link>
      <div className="px-2 p-5 ">
        <Link href={`event/${event._id}`}>
          <h2 className="text-lg font-medium">{event.name}</h2>
        </Link>
        <p className="mb-2 font-light ">Friday . 10:30 PM GMT+ 5:30</p>
        <p className="text-lg font-medium mb-2"> From ${event.price}</p>
        <button className="primary-button" type="button">
          Add ticket
        </button>
      </div>
    </div>
  );
}

export default EventItem;
