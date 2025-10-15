import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddRevisionNoteNotes } from "../../../components/Admin/RevisionNote/AddRevisionNoteNotes";
import { DisplayRevisionNoteNotes } from "../../../components/Admin/RevisionNote/DisplayRevisionNoteNotes";

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

  try {
    

    // Fetch all notes with related subjects
    const notes = await prisma.RevisionNote.findMany({
      include: { Subject: true },
      orderBy: { createdAt: "desc" }
    });

    const subjects = await prisma.Subject.findMany({
      orderBy: { createdAt: "desc" }
    });

    const formattedNotes = notes.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      subject: note.Subject ? note.Subject.name : "No subject",
      createdAt: note.createdAt
    }));

    // Format subjects for client
    const formattedSubjects = subjects.map(sub => ({
      id: sub.id,
      name: sub.name,
      description: sub.description,
      svg: sub.svg
    }));

    console.log(formattedNotes)

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(formattedSubjects)),
        notes: JSON.parse(JSON.stringify(formattedNotes))
      }
    };
  } catch (error) {
    console.error("Error fetching subjects or notes:", error);
    return {
      props: {
        subjects: [],
        notes: [],
        error: "Failed to fetch data."
      }
    };
  }
}

export default function RevisionNotePage({ subjects, notes }) {
  const { data } = useSession();
  
  return (
    <React.Fragment>
      <MainHeader title="Flashcards Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Topic & Flashcards Form */}
            <AddRevisionNoteNotes subjects={subjects} />

            {/* Display Existing Topics & Flashcards */}
            <DisplayRevisionNoteNotes notes={notes} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
