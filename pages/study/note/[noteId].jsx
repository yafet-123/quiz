import { prisma } from "../../../util/db.server";
import React from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaFilePdf,
  FaCloudArrowDown,
} from "react-icons/fa6";
import { MainHeader } from "../../../components/common/MainHeader";
import { Reveal } from "../../../components/common/Reveal";

export async function getServerSideProps(context) {
  const { noteId } = context.params;

  try {
    const id = Number(noteId);

    if (isNaN(id)) {
      return {
        notFound: true,
      };
    }

    const category = await prisma.NoteCategory.findUnique({
      where: {
        id,
      },
      include: {
        Subject: true,
        Note: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!category) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category: JSON.parse(JSON.stringify(category)),
      },
    };
  } catch (error) {
    console.error("Error fetching note category:", error);

    return {
      notFound: true,
    };
  }
}

export default function NoteCategoryDetail({ category }) {
  if (!category) {
    return <MainHeader title="Aceit : Notes" />;
  }

  const subjectName = category.Subject?.name || "Subject";
  const subjectId = category.Subject?.id || null;
  const notes = category.Note || [];

  return (
    <>
      <MainHeader title={`Aceit : ${category.title}`} />

      <div className="min-h-screen py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-ink-600 mb-4">
            <Link
              href="/study"
              className="hover:text-primary-700 transition-colors font-semibold"
            >
              Study
            </Link>

            <span className="text-ink-400">/</span>

            <Link
              href="/study/note"
              className="hover:text-primary-700 transition-colors font-semibold"
            >
              Note
            </Link>

            {subjectId && (
              <>
                <span className="text-ink-400">/</span>

                <Link
                  href={`/study/note/subject/${subjectId}`}
                  className="hover:text-primary-700 transition-colors font-semibold"
                >
                  {subjectName}
                </Link>
              </>
            )}

            <span className="text-ink-400">/</span>

            <span className="text-ink-800 font-semibold">
              {category.title}
            </span>
          </nav>

          {/* Back */}
          <div className="mb-10">
            <Link
              href={
                subjectId
                  ? "/study/note" 
                  : `/study/note/subject/${subjectId}`
              }
              className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <FaArrowLeft />
              Back to {subjectName}
            </Link>
          </div>

          {/* Header */}
          <span className="section-eyebrow block mb-4">
            {notes.length} notes available
          </span>

          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            {category.title}
          </h1>

          <p className="section-subtitle mt-4 max-w-3xl">
            Open the study notes below.
          </p>

          {/* Notes */}
          <div className="mt-12 flex flex-col">
            {notes.length === 0 ? (
              <div className="glass-card p-12 text-center max-w-xl mx-auto">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaFilePdf />
                </div>

                <h3 className="section-title text-xl mb-2">
                  Nothing here yet
                </h3>

                <p className="text-ink-500">
                  No notes are available for this category yet.
                </p>
              </div>
            ) : (
              notes.map((note, index) => (
                <Reveal
                  key={note.id}
                  delay={(index % 5) * 70}
                  className="mb-5"
                >
                  <div className="glass-card group flex items-center justify-between gap-4 p-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-3xl shadow-soft">
                        <FaFilePdf />
                      </div>

                      <div className="min-w-0">
                        <h3 className="section-title text-lg md:text-xl group-hover:text-primary-700 transition-colors">
                          {note.title}
                        </h3>

                        <p className="text-ink-500 text-sm mt-1">
                          Study note
                        </p>
                      </div>
                    </div>

                    <a
                      href={note.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary shrink-0 px-4 py-2.5 text-sm md:px-5 inline-flex items-center gap-2"
                    >
                      <FaCloudArrowDown />
                      Open
                    </a>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}