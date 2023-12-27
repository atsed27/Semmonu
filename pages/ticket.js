/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import React, { useContext } from 'react';
import Link from 'next/link';
function Ticket() {
  const { state } = useContext(Store);
  const { ticket } = state;
  console.log(ticket);
  return (
    <Layout>
      <div className="container m-auto mt-4 px-4">
        <h2 className="text-center text-2xl md:text-5xl font-semibold ">
          Your tickets
        </h2>
        {ticket.ticketItems.length === 0 ? (
          <div>
            Ticket bag is empty.<Link href="/">Go to Events</Link>
          </div>
        ) : (
          <div>
            <div className=" mx-5 my-5 hidden sm:flex items-center justify-between">
              <h1 className="border-2 p-2 rounded-md">continue Events</h1>
              <h1 className="text-xl text-white bg-black p-2 rounded-md">
                checkout Now
              </h1>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              <div className=" md:col-span-3">
                {ticket.ticketItems.map((item) => (
                  <div className="my-3" key={item._id}>
                    <div className="flex my-10 md:my-0 flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center md:items-start jioC ">
                        <img
                          className="h-1/2 w-1/2 lg:w-1/3 lg:h-1/4"
                          src={item.image}
                          alt="event"
                        />
                        <div className="ml-5">
                          <h2 className="text-lg font-semibold ">
                            {item.name} Event{' '}
                          </h2>
                          <h2 className="text-lg font-semibold ">
                            {item.category}
                          </h2>
                          <h2 className="text-lg font-bold ">
                            {item.rating} out of 10
                          </h2>
                          <h2 className="text-lg font-bold ">
                            {item.numReviews} view
                          </h2>
                        </div>
                      </div>
                      <div className="my-5 text-xl ">
                        <div className="flex items-center">
                          <button className="text-3xl">+</button>
                          <h2 className="text-2xl px-2"> {item.quantity} </h2>
                          <button className="text-4xl">-</button>
                        </div>
                        <p> ${item.price} </p>
                      </div>
                    </div>
                    <hr className="my-5" />
                  </div>
                ))}
              </div>
              <div className="flex mb-5  items-center justify-center  ">
                <div>
                  <h1 className="text-2xl py-10 font-bold text-center">
                    Ticket Summary
                  </h1>
                  <div className="flex  items-center justify-between">
                    <h2>Subtotal</h2>
                    <h2>$100</h2>
                  </div>
                  <div className="flex py-3 items-center justify-between">
                    <h2>bonus</h2>
                    <h2>$10</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1>Total </h1>
                    <h1>$90</h1>
                  </div>
                  <div className="flex py-10 items-start justify-center">
                    <button className=" px-10 py-2 text-white font-semibold bg-black ">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Ticket;
