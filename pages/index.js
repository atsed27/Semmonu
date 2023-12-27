import Layout from '@/components/Layout';
import event from '../public/Image/event.png';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <Layout>
      <div>
        <div className="">
          <div className="flex flex-col-reverse items-center justify-end h-screen sm:justify-center jio bg-primary sm:flex-row">
            <div className="px-2 sm:px-5">
              <h1 className="text-3xl font-bold sm:text-5xl lg:text-7xl">
                Discover Events
              </h1>
              <h2 className="text-4xl font-bold sm:text-5xl lg:text-7xl text-secondary">
                around You !
              </h2>
              <p className="py-4 text-white sm:py-8 sm:w-96">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis
              </p>
              <div className="flex items-center justify-between jioLink">
                <Link
                  className="px-3 py-2 border rounded-full bg-orange jioLinkT"
                  href="/"
                >
                  Create Event
                </Link>
                <Link
                  className="px-3 py-2 bg-white border rounded-full jioLinkT "
                  href="/"
                >
                  browse Event
                </Link>
              </div>
            </div>
            <div>
              <Image src={event} alt="event" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
