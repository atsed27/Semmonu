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
import Loader from './loader/Loader';

function Layout({ children, title }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);

  const { ticket } = state;
  const [ticketCount, setTicketCount] = useState(0);
  useEffect(() => {
    setTicketCount(ticket.ticketItems.reduce((a, c) => a + c.quantity, 0));
  }, [ticket.ticketItems]);

  const logOutHandler = () => {
    Cookies.remove('ticket');
    dispatch({ type: 'Ticket_Reset' });
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + '-semonun' : 'semonun'}</title>
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div>
        {status === 'loading' ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col justify-between min-h-screen">
            <header className="">
              <nav className="flex items-center justify-between px-4 bg-primary h-14 sm:h-12">
                <Link href={'/'} className="text-lg sm:text-2xl">
                  {' '}
                  <span className="sm:text-3xl">S</span>emo
                  <span className="text-white ">nun</span>
                </Link>
                <div>
                  <Link href={'/ticket'} className="">
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
                          <DropdownLink
                            href="/profile"
                            className="dropdown-link"
                          >
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
            <main className="m-auto mx-0 mt-0">{children}</main>
            <footer className="flex flex-col items-center justify-center bg-primary ">
              <div className="w-full ">
                <div className="grid grid-cols-2 gap-4 mx-3 my-2 md:grid-cols-4">
                  <div className="">
                    <h2 className="mb-4 text-xl font-bold md:text-2xl">
                      <span className="text-xl sm:text-3xl">S</span>emo
                      <span className="text-white ">nun</span>
                    </h2>
                    <p className="text-white">
                      Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="">
                    <h2 className="mb-4 text-xl font-bold ">Useful links</h2>
                    <div className="">
                      <Link href={'/'}>
                        <h2 className="py-1"> About us</h2>
                      </Link>{' '}
                      <Link href={'/'}>
                        <h2 className="py-1"> Events</h2>
                      </Link>
                      <Link href={'/'}>
                        <h2 className="py-1"> Blogs</h2>
                      </Link>
                      <Link href={'/'}>
                        <h2 className="py-1"> FAQ</h2>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-4 text-xl font-bold">Main Menu</h2>
                    <div className="">
                      <Link href={'/'}>
                        <h2 className="py-1"> Home</h2>
                      </Link>{' '}
                      <Link href={'/'}>
                        <h2 className="py-1"> Offers</h2>
                      </Link>
                      <Link href={'/'}>
                        <h2 className="py-1"> Menu</h2>
                      </Link>
                      <Link href={'/'}>
                        <h2 className="py-1"> Create Event</h2>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
                    <div className="">
                      <Link href={'/'}>
                        <h2 className="py-1">melhik@gmail.com</h2>
                      </Link>{' '}
                      <Link href={'/'}>
                        <h2 className="py-1">+251 916 213 371</h2>
                      </Link>
                      <Link href={'/'}>
                        <h2 className="py-1">social</h2>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4 text-white">
                <h2 className="text-lg">
                  Copyright @ 2023 melhk | All right reserved
                </h2>
              </div>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}

export default Layout;
