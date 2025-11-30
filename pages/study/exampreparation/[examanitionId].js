import React from "react";
import { prisma } from "../../../util/db.server";
import { FaFilePdf } from "react-icons/fa6";
import { MainHeader } from "../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { examanitionId } = context.params;
  console.log(examanitionId)

  try {
    // Fetch the topic with its exam preparation
    const topic = await prisma.ExamPreparationTopic.findUnique({
      where: { id: Number(examanitionId) },
      include: {
        examPreparation: true, // include the parent ExamPreparation
      },
    });

    if (!topic) {
      return { notFound: true };
    }

    // Split bookFile and nameOfBook if you stored multiple books as comma-separated
    const bookNames = topic.examPreparation.nameOfBook
      ? topic.examPreparation.nameOfBook.split(",")
      : [];
    const bookLinks = topic.examPreparation.bookFile
      ? topic.examPreparation.bookFile.split(",")
      : [];

    const books = bookNames.map((name, index) => ({
      name: name.trim(),
      link: bookLinks[index] ? bookLinks[index].trim() : "#",
    }));

    return {
      props: {
        topicTitle: topic.title,
        books,
      },
    };
  } catch (error) {
    console.error("Error fetching exam preparation topic:", error);
    return {
      props: {
        topicTitle: "",
        books: [],
      },
    };
  }
}

export default function ExamPreparationTopicPage({ topicTitle, books }) {
  return (
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <MainHeader title={`Aceit : ${topicTitle} Exam Preparation`} />

      <h1 className="text-3xl font-bold mb-8">{topicTitle}</h1>

      {books.length === 0 && (
        <p className="text-gray-600 text-lg">
          No books available for this topic.
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
  );
}
