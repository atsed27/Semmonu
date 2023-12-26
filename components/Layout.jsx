import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title> {title ? title + '- Semonun' : 'Semonun '} </title>
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header className="">
          <nav className="flex items-center bg-green-400 h-14 sm:h-12 justify-between px-4">
            <Link href={'/'} className=" text-lg sm:text-2xl">
              {' '}
              Semo<span className="text-white ">nun</span>
            </Link>
            <div>
              <Link href={'/event'} className="p-2 ">
                Events
              </Link>
              <Link
                href={'/login'}
                className="px-2 py-1 border bg-gray-100 rounded-full"
              >
                SignIn
              </Link>
            </div>
          </nav>
        </header>
        <main className="  mt-0">{children}</main>
        <footer className="flex justify-center items-center bg-green-400">
          footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
