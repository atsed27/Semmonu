import Layout from '@/components/Layout';
import Loader from '@/components/loader/Loader';
import { useSession } from 'next-auth/react';
import React from 'react';

function TicketGenerator() {
  const date = Date.now();
  const { status, data: session } = useSession();

  console.log(date);
  console.log(session);

  return (
    <Layout title={'Your Id'}>
      <div>
        {status === 'loading' ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="flex  flex-col items-center  justify-center h-screen">
            <h1 className="text-2xl font-semibold">Your Id is :</h1>
            <div className="my-2">
              <h3 className="text-xl text-green-900 font-bold">
                {session?.user?.name + date}
              </h3>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TicketGenerator;

TicketGenerator.auth = true;
