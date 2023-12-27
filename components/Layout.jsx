import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@/utils/store';

function Layout({ children, title }) {
  const { state } = useContext(Store);
  const { ticket } = state;
  return (
    <>
      <Head>
        <title>{title ? title + '-semonun' : 'semonun'}</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <header className="">
          <nav className="flex items-center justify-between px-4 bg-green-400 h-14 sm:h-12">
            <Link href={'/'} className="text-lg sm:text-2xl">
              {' '}
              Semo<span className="text-white ">nun</span>
            </Link>
            <div>
              <Link href={'/ticket'} className=" ">
                Ticket
              </Link>
              {ticket.ticketItems.length > 0 && (
                <span className="px-2 py-1 ml-1 text-sm font-bold text-white bg-red-700 rounded-full">
                  {ticket.ticketItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
              <Link
                href={'/login'}
                className="px-2 py-1 bg-gray-100 border rounded-full"
              >
                SignIn
              </Link>
            </div>
          </nav>
        </header>
        <main className="m-auto mx-0 mt-0">{children}</main>
        <footer className="flex items-center justify-center bg-green-400">
          footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
