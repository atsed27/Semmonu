import Layout from '@/components/Layout';
import event from '../public/Image/event.png';
import Image from 'next/image';
import sell from '../public/Image/sell.png';
import pay from '../public/Image/Pay/Pay_W.png';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loader from '@/components/loader/Loader';

function Home() {
  const { status } = useSession();

  return (
    <Layout title="Home">
      {status === 'loading' ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="m-auto mx-0 mt-0">
          <div className="flex flex-col-reverse items-center justify-end h-screen sm:justify-center jio bg-primary sm:flex-row">
            <div className="px-2 sm:px-5">
              <h1 className="text-4xl font-bold jioT sm:text-5xl lg:text-7xl">
                Discover Events
              </h1>
              <h2 className="text-3xl font-bold sm:text-5xl lg:text-7xl text-secondary">
                around You !
              </h2>
              <p className="py-4 text-white sm:py-8 sm:w-96">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis
              </p>
              <div className="flex items-center justify-between jioLink">
                <Link
                  className="px-3 py-2 border rounded-full bg-orange jioLinkT"
                  href="/createEvent"
                >
                  Create Event
                </Link>
                <Link
                  className="px-3 py-2 bg-white border rounded-full jioLinkT "
                  href="/event"
                >
                  browse Event
                </Link>
              </div>
            </div>
            <div>
              <Image src={event} alt="event" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl ">Fast online payment</h1>
            <div>imag</div>
          </div>
          <div className="flex items-center justify-center h-96 bg-primary">
            <div className="mb-5">
              <h1 className="text-4xl font-bold text-center sm:text-left sm:text-5xl lg:text-7xl text-textPrimary">
                Sell ticket online
              </h1>
              <p className="px-3 py-5 text-white sm:w-96">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis
              </p>
              <Link
                className="px-3 py-3 ml-5 text-xl border rounded-full bg-orange"
                href="/"
              >
                Create Event now!
              </Link>
            </div>
            <div className="hidden mb-5 sm:flex">
              <Image src={sell} alt="sell" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start sm:justify-center sm:flex-row">
            <div>
              <Image src={pay} alt="pay" />
            </div>
            <div className="px-3 mb-5">
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl text-textPrimary ">
                Get paid instantly
              </h1>
              <p className="sm:w-[30rem] text-black pt-10">
                Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                Nuncvulputate libero et velit interdum, acaliquet odio mattis.
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;
