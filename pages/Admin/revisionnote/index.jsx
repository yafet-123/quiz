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
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user',
        permanent: false,
      },
    };
  }

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
      subjectId: note.subjectId,
      createdAt: note.createdAt,
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
      <MainHeader title="RevisionNote Dashboard" />
      <div className="flex bg-[#e6e6e6] pt-20">
        <VerticalNavbar data={data} />
        <div className="flex-1 px-6 min-w-0">
          <AddRevisionNoteNotes subjects={subjects} />
          <DisplayRevisionNoteNotes notes={notes} subjects={subjects} />
        </div>
      </div>
    </React.Fragment>
  );
}
