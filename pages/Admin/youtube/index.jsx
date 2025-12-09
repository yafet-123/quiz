import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddYoutube } from "../../../components/Admin/Youtube/AddYoutube";
import { DisplayYoutubes } from "../../../components/Admin/Youtube/DisplayYoutubes";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Redirect non-admins
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user',
        permanent: false,
      },
    };
  }

  // Fetch all subjects with youtube links and topics
  const subjects = await prisma.Subject.findMany({
    include: {
      YoutubeLink: {
        include: {
          YoutubeLinkTopic: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Map for easier client-side rendering
  const formattedSubjects = subjects.map(sub => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    YoutubeLink: sub.YoutubeLink.map(video => ({
      id: video.id,
      title: video.title,
      url: video.url,
      YoutubeLinkTopic: video.YoutubeLinkTopic.map(topic => ({
        id: topic.id,
        title: topic.title,
      })),
    })),
  }));

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function YoutubePage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="YouTube Videos Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add YouTube Form */}
            <AddYoutube subjects={subjects} />

            {/* Display Existing YouTube Videos */}
            <DisplayYoutubes subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
