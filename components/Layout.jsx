import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Layout({ children, title }) {
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
              <Link href={'/eventScreen'} className="p-2 ">
                Events
              </Link>
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
