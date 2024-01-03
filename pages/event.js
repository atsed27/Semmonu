import Layout from '@/components/Layout';
import React, { useContext } from 'react';
import EventItem from '@/components/EventItem';
import db from '@/utils/db';
import Events from '@/model/Events';
import { Store } from '@/utils/store';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EventScreen({ events }) {
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  console.log(ticket);
  const addTicket = async (event) => {
    console.log(event);
    const existItem = ticket.ticketItems.find((item) => item._id === event._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`api/event/${event._id}`);
    if (data.countInStock < quantity) {
      toast.error('sorry Event ticket is out of stack');
      return;
    }
    dispatch({ type: 'Ticket_ADD_ITEM', payload: { ...event, quantity } });
    toast.success('Event Ticket is add successfully ');
  };
  return (
    <Layout title={'Event'}>
      <div className="container grid grid-cols-1 gap-4 m-auto mt-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <EventItem addTicket={addTicket} event={event} key={event._id} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const events = await Events.find().lean();
  return {
    props: { events: events.map(db.convertDocToObj) },
  };
}
