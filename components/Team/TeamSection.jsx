import Image from 'next/image';

const teamMembers = [
  {
    name: 'Hilary Sedgwick',
    title: 'Founder & CEO',
    image: '/Testimonals/cherishe.jpg', // Add your image paths here
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-l-full tansform -rotate-45 bg-opacity-50',
  },
  {
    name: 'Scott Peters',
    title: 'Founder & CEO',
    image: '/Testimonals/maleone.jpg',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-r-full tansform rotate-45 bg-opacity-50',
  },
  {
    name: 'Jack Hartman',
    title: 'Founder & CEO',
    image: '/Testimonals/cherishe.jpg',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-b-full tansform -rotate-45 bg-opacity-50',
  },
  {
    name: 'Heather Kramer',
    title: 'Founder & CEO',
    image: '/Testimonals/maletwo.jpg',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-t-full tansform -rotate-90 bg-opacity-50',
  },
];

export const TeamMember = ({ index, name, title, image, description, shape }) => {
  const isEven = index % 2 === 0;
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} relative z-10 px-4`}>
      <div className="w-full md:w-1/2">
        <div className="w-full h-72 md:h-[500px] relative">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            priority
            className=""
          />
        </div>
      </div>
      <div className="text-justify md:w-1/2 flex flex-col justify-center px-6">
        <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-5">{name}</h3>
        <p className="text-[#000] text-md lg:text-lg font-bold mb-5">{title}</p>
        <p className="text-[#000] text-md lg:text-lg">{description}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="bg-[#fff] text-black pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center px-4">
          <div className="mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600">Meet our team</h2>
            <p className="text-lg lg:text-xl mt-4 text-black">
              Award-winning national and international key opinion leaders
            </p>
          </div>
    
          <div className="hidden lg:flex relative w-48 h-24 bg-blue-600 flex align-center justify-center rounded-b-full tansform -rotate-45">
            <div className="absolute -top-5 w-32 h-20 bg-black border-blue-600 rounded-b-full"></div>
          </div>
        </div>

        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            index={index}
            name={member.name}
            title={member.title}
            image={member.image}
            description={member.description}
            shape={member.shape}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;