import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React from 'react';

function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title={'unauthorized'}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl ">Access Denied</h1>
        {message && <div className="text-red-500">{message}</div>}
      </div>
    </Layout>
  );
}

export default Unauthorized;
