import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Link from 'next/link';

function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  useEffect(() => {
    if (message === 'login required') {
      router.push('/login');
    }
  }, [message, router]);
  return (
    <Layout title={'unauthorized'}>
      <div className="px-4 mt-4">
        <Link href={'/'}>back</Link>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-xl ">Access Denied</h1>
        {message && <div className="text-red-500">{message}</div>}
      </div>
    </Layout>
  );
}

export default Unauthorized;
