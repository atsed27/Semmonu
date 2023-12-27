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
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`event/${event._id}`}>
          <h2 className="text-lg">{event.name}</h2>
        </Link>
        <p className="mb-2">{event.category}</p>
        <p className="">${event.price}</p>
        <button className="primary-button" type="button">
          Add ticket
        </button>
      </div>
    </div>
  );
}

export default EventItem;
