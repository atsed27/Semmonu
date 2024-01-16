import Layout from '@/components/Layout';
import { Store } from '@/utils/store';

import React, { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function PanelFinal() {
  const { state } = useContext(Store);
  const { ticket } = state;
  const router = useRouter();
  console.log(ticket.panelMethod);
  const handleChapa = async () => {
    try {
      const res = await axios.post('/api/pay/chapa/:id');

      const { checkout_url } = res.data.data;
      router.push(checkout_url);
      console.log(checkout_url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={'subscribe'}>
      <div className="h-screen mt-8">
        <h2 className="mb-4 text-xl font-bold text-center">Subscribe:</h2>
        <div className="flex items-center justify-center ">
          <div
            className={
              'border-2 shadow-lg rounded-xl w-11/12 md:w-1/2 hover:bg-slate-100'
            }
          >
            <div className="flex flex-col items-center justify-center px-2 pt-3 ">
              <h3 className="py-2 text-xl font-bold ">
                {ticket.panelMethod === 'oneTime' && (
                  <div>
                    <h2>One Time</h2>
                  </div>
                )}
                {ticket.panelMethod === 'basic' && (
                  <div>
                    <h2>Basic</h2>
                  </div>
                )}
                {ticket.panelMethod === 'pro' && (
                  <div>
                    <h2>Pro</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proMax' && (
                  <div>
                    <h2>Pro Max</h2>
                  </div>
                )}

                {ticket.panelMethod === 'basicY' && (
                  <div>
                    <h2>Basic</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proY' && (
                  <div>
                    <h2>Pro </h2>
                  </div>
                )}
                {ticket.panelMethod === 'proMaxY' && (
                  <div>
                    <h2>Pro Max</h2>
                  </div>
                )}
              </h3>
              <h1 className="py-2 text-4xl font-bold ">
                {ticket.panelMethod === 'oneTime' && (
                  <div>
                    <h2>$ 12</h2>
                  </div>
                )}
                {ticket.panelMethod === 'basic' && (
                  <div>
                    <h2>$ 30</h2>
                  </div>
                )}
                {ticket.panelMethod === 'pro' && (
                  <div>
                    <h2>$ 50</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proMax' && (
                  <div>
                    <h2>$ 80</h2>
                  </div>
                )}
                {ticket.panelMethod === 'basicY' && (
                  <div>
                    <h2> $ 300</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proY' && (
                  <div>
                    <h2>$ 550 </h2>
                  </div>
                )}
                {ticket.panelMethod === 'proMaxY' && (
                  <div>
                    <h2>$ 800</h2>
                  </div>
                )}
              </h1>
              <h3 className="py-2 text-lg">
                {ticket.panelMethod === 'basic' && (
                  <div>
                    <h2>per month</h2>
                  </div>
                )}
                {ticket.panelMethod === 'pro' && (
                  <div>
                    <h2>per month</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proMax' && (
                  <div>
                    <h2>per month</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proMaxY' && (
                  <div>
                    <h2>per year</h2>
                  </div>
                )}
                {ticket.panelMethod === 'proY' && (
                  <div>
                    <h2>per year</h2>
                  </div>
                )}
                {ticket.panelMethod === 'basicY' && (
                  <div>
                    <h2>per year</h2>
                  </div>
                )}
              </h3>

              <p className="py-2 ">
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
        <div className="flex flex-col items-center justify-center my-8 ">
          <button
            onClick={handleChapa}
            className="w-1/2 my-2 text-xl font-medium primary-button"
          >
            Pay {ticket.paymentMethod} Now
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default PanelFinal;
