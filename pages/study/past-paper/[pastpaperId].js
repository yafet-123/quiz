import React from "react";
import { prisma } from "../../../util/db.server";
import { FaFilePdf } from "react-icons/fa6";
import { MainHeader } from "../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { pastpaperId } = context.params;

  try {
    const pastpaper = await prisma.PastPaper.findUnique({
      where: {
        id: Number(pastpaperId),
      },
    });

    if (!pastpaper) {
      return { notFound: true };
    }

    // Split book names and links
    const bookNames = pastpaper.nameOfBook
      ? pastpaper.nameOfBook.split(",")
      : [];

    const bookLinks = pastpaper.bookFile
      ? pastpaper.bookFile.split(",")
      : [];

    const books = bookNames.map((name, index) => ({
      name: name.trim(),
      link: bookLinks[index] ? bookLinks[index].trim() : "#",
    }));

    return {
      props: {
        title: `Past Paper`,
        books,
      },
    };
  } catch (error) {
    console.error("Error fetching past paper:", error);

    return {
      props: {
        title: "",
        books: [],
      },
    };
  }
}

export default function PastPaperPage({ title, books }) {
  return (
    <>
      <MainHeader title={`Aceit : ${title}`} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        {books.length === 0 && (
          <p className="text-gray-600 text-lg">
            No books available for this past paper.
          </p>
        )}

        <div className="flex flex-col">
          {books.map((book, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#f8f8f9] py-5 px-4 rounded-2xl hover:bg-[#ededf2] mb-5"
            >
              <div className="flex items-center">
                <FaFilePdf size={40} color="#df646a" />
                <h1 className="pl-4 text-black font-bold text-md md:text-lg">
                  {book.name}
                </h1>
              </div>

              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3699ff] hover:bg-[#002244] text-white px-3 py-2 rounded-2xl text-md md:text-lg font-bold"
              >
                Open Book
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
