import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddTopicWithFlashcards } from "../../../components/Admin/Flashcard/AddTopicWithFlashcards";
import { DisplayFlashcards } from "../../../components/Admin/Flashcard/DisplayFlashcards";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Optionally redirect non-admins
  // if (userRole !== 'admin') {
  //   return {
  //     redirect: {
  //       destination: '/auth/Admin/Login/signin-user',
  //       permanent: false,
  //     },
  //   };
  // }

  // Fetch all subjects with topics and flashcards
  const subjects = await prisma.Subject.findMany({
    include: {
      Topics: {
        include: {
          Flashcards: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  // Map for easier client-side rendering
  const formattedSubjects = subjects.map(sub => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    Topics: sub.Topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      Flashcards: topic.Flashcards.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition
      }))
    }))
  }));
  console.log(formattedSubjects)
  console.log(subjects)
  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    }
  };
}

export default function FlashcardsPage({ subjects }) {
  const { data } = useSession();
  
  return (
    <React.Fragment>
      <MainHeader title="Flashcards Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Topic & Flashcards Form */}
            <AddTopicWithFlashcards subjects={subjects} />

            {/* Display Existing Topics & Flashcards */}
            <DisplayFlashcards subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
