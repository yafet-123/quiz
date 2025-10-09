import Image from 'next/image'
import Image1 from '../../public/background.jpg';
import Image2 from '../../public/background.jpg';

export default function NewsEvents() {
  const events = [
    { date: '04 Jan', title: 'Event 1' },
    { date: '05 Jan', title: 'Event 2' },
    { date: '06 Jan', title: 'Event 3' },
  ];

  const eventsTwo = [
    {
      image:'/heroImge1.jpg',
      author:"name",
      date:"12-02-2024",
      description:"This is the descreption for the event one.This is the descreption for the event two.This is the descreption for the event two"
    },
    {
      image:Image2,
      author:"Second Name",
      date:"6-10-2023",
      description:"This is the descreption for the event two.This is the descreption for the event two.This is the descreption for the event two"
    }
  ]
  return (
    <div className="py-20 bg-[#44576a] px-5 lg:px-20">
      <h2 className="text-center text-3xl font-bold mb-10 text-white">News & Events</h2>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col justify-between lg:w-1/4 h-full">
          {events.map((event, index) => (
            <div key={index} className="bg-white my-5 p-6 rounded-lg shadow-md text-center">
              <p className="text-blue-900 font-bold mb-2">{event.date}</p>
              <p className="text-gray-600">{event.title}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:w-3/4 my-5 text-white">
          {eventsTwo.map((data,index)=>(
            <div key={index} className="flex flex-col justify-between w-full h-full lg:mx-10 mb-10 lg:mb-0">
              <div className="relative w-full h-72">
                <Image
                  src={data.image}
                  alt={`Image ${index}`}
                  layout="fill"
                  objectFit="cover" 
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between my-2">
                <p className="text-lg font-bold">{data.author}</p>
                <p className="text-md font-normal mb-2">{data.date}</p>
              </div>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
