import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function PaySelect() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const router = useRouter();
  const { message } = router.query;
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { paymentMethod } = ticket;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      return toast.error('payment method not selected');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPayment });
    Cookies.set(
      'ticket',
      JSON.stringify({
        ...ticket,
        paymentMethod: selectedPayment,
      })
    );
    if (message === 'panel') {
      router.push('panelFinal');
    } else {
      router.push('/pay');
    }
  };
  useEffect(() => {
    setSelectedPayment(paymentMethod || '');
  }, [paymentMethod, router]);
  return (
    <Layout>
      <div className="px-3 mt-20 jloPay">
        <form className="max-w-md m-auto" onSubmit={submitHandler}>
          <h1 className="mb-4 text-xl">Payment Method</h1>
          {['paypal', 'Stripe', 'Chapa', 'SantimPay', 'teleBirr'].map(
            (payment) => (
              <div className="mb-4" key={payment}>
                <input
                  id={payment}
                  name="paymentMethod"
                  className="p-2 outline-none focus:ring-0"
                  type="radio"
                  checked={selectedPayment === payment}
                  onChange={() => setSelectedPayment(payment)}
                />
                <label htmlFor={payment} className="p-2">
                  {payment}
                </label>
              </div>
            )
          )}
          <div className="flex justify-between my-4">
            <button
              onClick={() =>
                router.push(message === 'panel' ? '/choosePrice' : '/ticket')
              }
              className="default-button"
              type="button"
            >
              Back
            </button>
            <button className="primary-button">Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default PaySelect;

PaySelect.auth = true;
