import { MainHeader } from "../../../components/common/MainHeader";
import {getAllNotes,getNotesById } from "../../../data/NotesData.jsx";
import DetailNote from "../../../components/books/DetailNote";

export default function BookDetail({ notes }) {
  notes = notes[0]
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`MatricMate`} />
      <DetailNote notes={notes} />
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const noteId = context.params.noteId;
  console.log(noteId)
  const notes = getNotesById(noteId);

  if (!notes) {
    return {
      notFound: true,
    };
  }

  return {
    props: { notes },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const notes = getAllNotes();
  console.log(context)

  // Get the paths we want to pre-render based on books
  const paths = notes.map((note) => ({
    params: { noteId: note.id.toString() }, // convert id → string
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};
