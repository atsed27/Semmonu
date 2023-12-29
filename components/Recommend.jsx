import Image from 'next/image';

function Recommend({ events }) {
  console.log(events);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 ">
        {events.map((item) => (
          <div className="flex items-center justify-center " key={item._id}>
            <div className="">
              <Image src={item.image} alt="event" width={230} height={100} />
              <div className="pl-2 py-2">
                <h2 className="w-11/12  text-md font-medium"> {item.name} </h2>
                <h2>Friday . 1:00 PM GMT+5:30</h2>
                <h2 className="text-md font-medium">From $9.99</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommend;
