/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import React, { useContext } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function Ticket() {
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const router = useRouter();
  return (
    <Layout>
      <div className="container m-auto mt-4 px-4">
        <h2 className="text-center text-2xl md:text-5xl font-semibold ">
          Your tickets
        </h2>
        {ticket.ticketItems.length === 0 ? (
          <div>
            Ticket bag is empty.<Link href="/event">Go to Events</Link>
          </div>
        ) : (
          <div>
            <div className=" mx-5 my-5 hidden sm:flex items-center justify-between">
              <h1 className="border-2 p-2 rounded-md">continue Events</h1>
              <h1 className="text-xl text-white bg-primary p-2 rounded-md">
                Buy Now
              </h1>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              <div className=" md:col-span-3">
                {ticket.ticketItems.map((item) => (
                  <div className="my-3" key={item._id}>
                    <div className="flex my-10 md:my-0 flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center justify-start md:items-start jioC ">
                        <a
                          href={`/event/${item._id}`}
                          className='className="h-1/2 w-1/2 lg:w-1/3 lg:h-1/4"'
                        >
                          <img className="" src={item.image} alt="event" />
                        </a>

                        <div className="ml-5">
                          <h2 className="text-lg font-semibold ">
                            {item.name} Event{' '}
                          </h2>
                          <h2 className="text-md font-medium ">
                            {item.category}
                          </h2>
                          <h2 className="text-base  ">
                            {item.rating} out of 10
                          </h2>
                          <h2 className="text-base ">{item.numReviews} view</h2>
                        </div>
                      </div>
                      <div className="my-5 text-lg flex flex-col items-center ">
                        <div>
                          <button
                            onClick={() => {
                              dispatch({
                                type: 'Ticket_Remove_ITEM',
                                payload: item,
                              });
                            }}
                            className="bg-red-500 rounded-full px-2"
                          >
                            X
                          </button>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              const quantity = item.quantity + 1;
                              if (item.countInStock < quantity) {
                                alert('sorry,ticket is out of stack');
                                return;
                              }
                              dispatch({
                                type: 'Ticket_ADD_ITEM',
                                payload: { ...item, quantity: quantity },
                              });
                            }}
                            className="text-xl"
                          >
                            +
                          </button>
                          <h2 className="text-xl px-2"> {item.quantity} </h2>
                          <button
                            className="text-2xl"
                            onClick={() => {
                              const quantity = item.quantity - 1;
                              if (quantity === 0) {
                                dispatch({
                                  type: 'Ticket_Remove_ITEM',
                                  payload: { item },
                                });
                                return;
                              }
                              dispatch({
                                type: 'Ticket_Diff_Item',
                                payload: { ...item, quantity: quantity },
                              });
                            }}
                          >
                            -
                          </button>
                        </div>
                        <p> ${item.price * item.quantity} </p>
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
                    <h2>
                      ${' '}
                      {ticket.ticketItems.reduce(
                        (a, c) => a + c.quantity * c.price,
                        0
                      )}{' '}
                    </h2>
                  </div>
                  <div className="flex py-3 items-center justify-between">
                    <h2>bonus</h2>
                    <h2>$10</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Total </h1>
                    <h1>$90</h1>
                  </div>
                  <div className="flex py-10 items-start justify-center">
                    <button
                      onClick={() => router.push('login?redirect=/paySelect')}
                      className=" px-10 py-2 text-white font-semibold bg-primary "
                    >
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

export default dynamic(() => Promise.resolve(Ticket), { ssr: false });
