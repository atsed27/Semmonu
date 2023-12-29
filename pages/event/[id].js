import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '@/utils/store';
import db from '@/utils/db';
import Events from '@/model/Events';
import Recommend from '@/components/Recommend';

function EventScreen(props) {
  const { state, dispatch } = useContext(Store);
  const { event, events } = props;
  console.log(events);
  const router = useRouter();
  if (!event) {
    return <div>Event is not found</div>;
  }
  const addTicket = () => {
    const existItem = state.ticket.ticketItems.find(
      (item) => item._id === event._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (event.countInStock < quantity) {
      alert('sorry,ticket is out of stack');
      return;
    }

    dispatch({
      type: 'Ticket_ADD_ITEM',
      payload: { ...event, quantity: quantity },
    });
    router.push('/ticket');
  };
  return (
    <Layout>
      <div className=" container  min-h-screen  m-auto mt-4">
        <div className="py-2">
          <Link href={'/event'}>back to event</Link>
        </div>
        <div className=" mx-2 grid md:grid-cols-4 md:gap-4">
          <div>
            <Image
              height={640}
              width={640}
              layout="responsive"
              src={event.image}
              alt="event "
            />
          </div>
          <div className="md:col-span-2 mb-5 ">
            <h1 className="text-xl font-bold">{event.name}</h1>
            <p className="sm:w-4/6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
            <h4 className="py-3">date : jan 23 2024</h4>
            <h2 className="text-xl font-bold py-2">Location</h2>
            <h2 className="text-textSecondary py-2">Addis Abeba,Bole</h2>
            <button className="text-xl bg-yellow-300 px-3 py-1 rounded-lg">
              Locate Me
            </button>
          </div>
          <div className="p-5 h-36  card ">
            <div className="flex justify-between mb-2">
              <div>price</div>
              <div>${event.price}</div>
            </div>
            <div className="flex justify-between my-2">
              <div>status</div>
              <div>{event.countInStock > 0 ? 'InStack' : 'Unavailable'}</div>
            </div>
            <button onClick={addTicket} className="w-full primary-button">
              Add ticket
            </button>
          </div>
        </div>
        <div className="py-2 md:py-4 lg:py-6">
          <Recommend events={events} />
        </div>
      </div>
    </Layout>
  );
}

export default EventScreen;

//server side rendering
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await db.connect();
  const event = await Events.findOne({ _id: id }).lean();
  const events = await Events.find().lean();
  await db.disconnect();
  return {
    props: {
      event: event ? db.convertDocToObj(event) : null,
      events: events.map(db.convertDocToObj),
    },
  };
}
