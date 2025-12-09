import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddPastPaper } from "../../../components/Admin/PastPaper/AddPastPaper";
import { DisplayPastPapers } from "../../../components/Admin/PastPaper/DisplayPastPapers";

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

  // Fetch all subjects with past papers and topics
  const subjects = await prisma.Subject.findMany({
    include: {
      PastPaper: {
        include: {
          PastPaperTopic: true,
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
    PastPaper: sub.PastPaper.map(paper => ({
      id: paper.id,
      title: paper.title,
      paperFile: paper.paperFile,
      year: paper.year,
      PastPaperTopic: paper.PastPaperTopic.map(topic => ({
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

export default function PastPaperPage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Past Papers Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Past Paper Form */}
            <AddPastPaper subjects={subjects} />

            {/* Display Existing Past Papers */}
            <DisplayPastPapers subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
