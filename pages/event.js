import Layout from '@/components/Layout';
import React from 'react';
import data from '@/utils/data';
import EventItem from '@/components/EventItem';

function EventScreen() {
  return (
    <Layout title={'Event'}>
      <div className="container grid grid-cols-1 gap-4 m-auto mt-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data.events.map((event) => (
          <EventItem event={event} key={event._id} />
        ))}
      </div>
    </Layout>
  );
}

export default EventScreen;
