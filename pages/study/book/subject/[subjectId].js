import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { FaBook, FaArrowLeft } from "react-icons/fa";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    // Directly fetch all books for the subject (across every category)
    const books = await prisma.Book.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        BookCategory: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return {
      props: {
        books: JSON.parse(JSON.stringify(books)),
      },
    };
  } catch (error) {
    console.error("Error loading books by subject:", error);
    return {
      props: {
        books: [],
        error: "Failed to load books.",
      },
    };
  }
}

export default function BooksBySubject({ books }) {
  return (
    <div className="py-32 px-5 lg:px-20 min-h-screen">
      <MainHeader title="Aceit : Books" />

      <Link
        href="/study/book"
        className="inline-flex items-center text-blue-600 font-semibold mb-6 hover:text-blue-800 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Subjects
      </Link>

      <h1 className="text-3xl font-bold mb-2">Books</h1>
      <p className="text-gray-500 text-md mb-8">
        All books for this subject are listed below.
      </p>

      {books.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          There are currently no books available for this subject. Please check back later.
        </p>
      ) : (
        <div className="flex flex-col">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex justify-between items-center bg-[#f8f8f9] py-5 px-4 rounded-2xl hover:bg-[#ededf2] mb-5"
            >
              <div className="flex items-center">
                <FaBook size={40} color="#3699ff" />
                <div className="pl-4">
                  <h1 className="text-black font-bold text-md md:text-lg">{book.title}</h1>
                  {book.BookCategory && (
                    <p className="text-sm text-gray-500">{book.BookCategory.title}</p>
                  )}
                </div>
              </div>

              <a
                href={book.bookFile}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3699ff] hover:bg-[#002244] text-white px-3 py-2 rounded-2xl text-md md:text-lg font-bold"
              >
                Open Book
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
