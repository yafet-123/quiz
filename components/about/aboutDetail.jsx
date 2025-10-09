import Image from 'next/image';

const AboutDetail = () => {
  const teamMembers = [
    {
      name: 'Our Mission',
      image: '/c1.jpg', // Add your image paths here
      description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-l-full tansform -rotate-45 bg-opacity-50',
    },
    {
      name: 'Our Vision',
      image: '/c2.jpg',
      description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-r-full tansform rotate-45 bg-opacity-50',
    },
    {
      name: 'Our Core',
      image: '/ev1.jpg',
      description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-b-full tansform -rotate-45 bg-opacity-50',
    },
    {
    name: 'Our Value',
    image: '/ev2.jpg',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-t-full tansform -rotate-90 bg-opacity-50',
  },
  ];
  return (
    <section className=" overflow-hidden">
      <div className="">
        {teamMembers.map((member, index) => (
          <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row bg-[#064469]' : 'md:flex-row-reverse bg-[#072d44]'} relative 
            z-10 px-5 lg:px-52 text-white py-10`}>
            <div className="w-full md:w-1/2 lg:px-6">
              <div className="relative w-full h-full overflow-hidden ">
                <Image
                  src={member.image}
                  alt={member.name}
                  priority
                  width={350}
                  height={350}
                  className="absolute w-full h-full lg:object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center lg:px-6 text-justify">
              <h3 className="text-2xl lg:text-3xl font-bold mb-5">{member.name}</h3>
              <p className="text-lg lg:text-xl">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutDetail;