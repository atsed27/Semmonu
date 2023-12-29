import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@/utils/store';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function Layout({ children, title }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const [ticketCount, setTicketCount] = useState(0);
  useEffect(() => {
    setTicketCount(ticket.ticketItems.reduce((a, c) => a + c.quantity, 0));
  }, [ticket.ticketItems]);

  const logOutHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_REST' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + '-semonun' : 'semonun'}</title>
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex flex-col justify-between min-h-screen">
        <header className="">
          <nav className="flex items-center justify-between px-4 bg-primary h-14 sm:h-12">
            <Link href={'/'} className="text-lg sm:text-2xl">
              {' '}
              Semo<span className="text-white ">nun</span>
            </Link>
            <div>
              <Link href={'/ticket'} className=" ">
                Ticket
              </Link>
              {ticketCount > 0 && (
                <span className="px-2 py-1 ml-1 text-sm font-bold text-white bg-red-700 rounded-full">
                  {ticketCount}
                </span>
              )}

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block ">
                  <Menu.Button className="px-2 py-1 bg-gray-100 border rounded-full top ">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink href="/profile" className="dropdown-link">
                        profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        href="/order-history"
                        className="dropdown-link"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>

                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logOutHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <a
                  href={'/login'}
                  className="px-2 py-1 bg-gray-100 border rounded-full"
                >
                  sign In
                </a>
              )}
            </div>
          </nav>
        </header>
        <main className="m-auto  mx-0 mt-0">{children}</main>
        <footer className="flex items-center justify-center bg-primary">
          footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
