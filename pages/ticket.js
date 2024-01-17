/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

function Ticket() {
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { paymentMethod } = ticket;
  console.log(paymentMethod);
  const router = useRouter();
  const subTotal = ticket.ticketItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  const Total = subTotal - 10;
  useEffect(() => {
    if (ticket.ticketItems.length === 0) {
      router.push('/event');
    }
  }, [router, ticket.ticketItems.length]);
  const paymentClick = async () => {
    console.log('payment');
    const res = await axios.post('/api/pay/chapaT/:id', {
      Total,
    });
    const { data } = res.data;
    dispatch({ type: 'Ticket_Reset' });
    Cookies.set(
      'ticket',
      JSON.stringify({
        ...ticket,
        ticketItems: [],
        panelMethod: '',
        paymentMethod: '',
      })
    );
    router.push(data?.checkout_url);
  };
  return (
    <Layout>
      <div className="container px-4 m-auto mt-4">
        <h2 className="text-2xl font-semibold text-center md:text-5xl ">
          Your tickets
        </h2>
        {ticket.ticketItems.length === 0 ? (
          <div>
            Ticket bag is empty.<Link href="/event">Go to Events</Link>
          </div>
        ) : (
          <div>
            <div className="items-center justify-between hidden mx-5 my-5 sm:flex">
              <Link href={'/event'}>
                <h1 className="p-2 border-2 rounded-md">continue Events</h1>
              </Link>
              <h1 className="p-2 text-xl text-white rounded-md bg-primary">
                Buy Now
              </h1>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              <div className=" md:col-span-3">
                {ticket.ticketItems.map((item) => (
                  <div className="my-3" key={item._id}>
                    <div className="flex flex-col items-center justify-between my-10 md:my-0 md:flex-row">
                      <div className="flex items-center justify-start md:items-start jioC ">
                        <a
                          href={`/event/${item._id}`}
                          className='className="w-1/2 h-1/2 lg:w-1/3 lg:h-1/4"'
                        >
                          <img className="" src={item.image} alt="event" />
                        </a>

                        <div className="ml-5">
                          <h2 className="text-lg font-semibold ">
                            {item.name} Event{' '}
                          </h2>
                          <h2 className="font-medium text-md ">
                            {item.category}
                          </h2>
                          <h2 className="text-base ">
                            {item.rating} out of 10
                          </h2>
                          <h2 className="text-base ">{item.numReviews} view</h2>
                        </div>
                      </div>
                      <div className="flex flex-col items-center my-5 text-lg ">
                        <div>
                          <button
                            onClick={() => {
                              dispatch({
                                type: 'Ticket_Remove_ITEM',
                                payload: item,
                              });
                            }}
                            className="px-2 bg-red-500 rounded-full"
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
                          <h2 className="px-2 text-xl"> {item.quantity} </h2>
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
              <div className="flex items-center justify-center mb-5 ">
                <div>
                  <h1 className="py-10 text-2xl font-bold text-center">
                    Ticket Summary
                  </h1>
                  <div className="flex items-center justify-between">
                    <h2>Subtotal</h2>
                    <h2>
                      ${' '}
                      {ticket.ticketItems.reduce(
                        (a, c) => a + c.quantity * c.price,
                        0
                      )}{' '}
                    </h2>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <h2>bonus</h2>
                    <h2>$10</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Total </h1>
                    <h1>${Total}</h1>
                  </div>
                  <div className="flex items-start justify-center py-10">
                    <div className="px-10 py-2 font-semibold text-white rounded-md ">
                      {paymentMethod ? (
                        <button
                          className="primary-button text-black"
                          onClick={paymentClick}
                        >
                          {' '}
                          pay with {paymentMethod}
                        </button>
                      ) : (
                        <button
                          className="bg-primary px-7 rounded-md py-2"
                          onClick={() =>
                            router.push(
                              'login?redirect=/paySelect?message=ticket '
                            )
                          }
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
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
