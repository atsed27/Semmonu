import Layout from '@/components/Layout';
import event from '../public/Image/event.png';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <Layout title="Home">
      <div className=" ">
        <div className="bg-green-400  px-3 lg:px-16 h-screen">
          <div className="flex flex-col-reverse sm:flex-row  items-center justify-center ">
            <div className="sm:w-1/4">
              <h1 className="text-2xl md:text-3xl py-2 lg:text-4xl lg:font-bold font-semibold">
                Discover Events
              </h1>
              <h3 className="text-2xl md:text-3xl   lg:text-4xl lg:font-bold font-semibold text-slate-400">
                around You !
              </h3>
              <div className="sm:pt-10">
                <p className="sm:w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdumLorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nunc vulputate libero et velit
                  interdum, ac aliquet odio mattis.
                </p>
              </div>
              <div className="pt-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={'/eventC'}
                    className="flex bg-red-300 rounded-full px-3 py-1"
                  >
                    Create Event
                  </Link>
                  <Link
                    href={'/eventB'}
                    className="flex rounded-full px-3 py-1 bg-white"
                  >
                    Browse Event
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <Image src={event} alt="event Home" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
