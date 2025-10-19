import { MainHeader } from "../../../components/common/MainHeader";
import DetailNote from "../../../components/books/DetailNote";
import { prisma } from "../../../util/db.server";
import Link from "next/link"
export default function BookDetail({ notes }) {
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`MatricMate`} />
      <div className="min-h-screen bg-gray-50 py-24 px-4 md:px-10">
        {/* Breadcrumb / Navigation */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Link href="/">
              <p className="text-purple-600 font-semibold hover:underline cursor-pointer">
                Home
              </p>
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-gray-700 font-medium">{notes.Subject.name}</p>
            <span className="text-gray-400">/</span>
            <p className="text-gray-900 font-bold">{notes.title}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Last modified: {new Date(notes.modifiedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Note Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {notes.title}
          </h1>

          <div className="mb-6">
            <span className="text-sm md:text-base text-gray-500">
              Subject:{" "}
              <span className="text-purple-600 font-semibold">
                {notes.Subject.name}
              </span>
            </span>
          </div>

          <div
            className="prose prose-purple max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: notes.content }}
          />

          {/* Back Button */}
          <div className="mt-8">
            <Link href={`/study/comprehensive-notes/subject/${notes.Subject.id}`}>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Back to Notes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { noteId } = context.params; // get noteId from the URL

  try { 
    const notes = await prisma.RevisionNote.findUnique({
      where: { id: Number(noteId) },
      include: {
        Subject: true, // Include related subject
      },
    });


    console.log("Fetched notes:", notes);

    return {
      props: {
        notes: JSON.parse(JSON.stringify(notes)), // serialize for Next.js
      },
    };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return {
      props: {
        notes: [],
        error: "Failed to load notes.",
      },
    };
  }
}
