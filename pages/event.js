import Layout from '@/components/Layout';
import React from 'react';
import EventItem from '@/components/EventItem';
import db from '@/utils/db';
import Events from '@/model/Events';

export default function EventScreen({ events }) {
  return (
    <Layout title={'Event'}>
      <div className="container grid grid-cols-1 gap-4 m-auto mt-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <EventItem event={event} key={event._id} />
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
