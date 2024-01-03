/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
function Recommend({ events }) {
  console.log(events);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {events.map((item) => (
          <div className="flex items-center justify-center " key={item._id}>
            <Link href={`http://localhost:3000/event/${item._id}`} className="">
              <img src={item.image} alt="event" className="h-48 w-60" />
              <div className="py-2 pl-2">
                <h2 className="w-11/12 font-medium text-md"> {item.name} </h2>
                <h2>Friday . 1:00 PM GMT+5:30</h2>
                <h2 className="font-medium text-md">From $9.99</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommend;
