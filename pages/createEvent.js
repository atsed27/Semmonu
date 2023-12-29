import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';

function CreateEvent() {
  const { data: session } = useSession();
  console.log(session?.user.isAdmin);
  if (!session?.user.isAdmin) {
    return (
      <Layout>
        <div className=" p-5">
          <Link className="" href="/">
            back
          </Link>
          <div className="text-red-500 text-xl font-semibold">
            Create event only admin
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>CreateEvent</div>
    </Layout>
  );
}

export default CreateEvent;
