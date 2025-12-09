import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const topics = await prisma.BookTopic.findMany({
      where: {
        Book: {
          subjectId: Number(subjectId),
        },
      },
      select: {
        id: true,
        title: true,
        bookId: true,
        Book: {
          select: {
            title: true,
            bookFile: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return {
      props: {
        topics: JSON.parse(JSON.stringify(topics)),
      },
    };
  } catch (error) {
    console.error("Error loading book topics:", error);
    return {
      props: {
        topics: [],
        error: "Failed to load book topics.",
      },
    };
  }
}

export default function BooksBySubject({ topics }) {
  const router = useRouter();

  const openTopic = (topicId) => {
    router.push(`/study/book/${topicId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Book Topics" />
      <div>
        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => openTopic(topic.id)}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              >
                <h2 className="font-bold text-xl md:text-2xl">{topic.title}</h2>
                <p className="mt-2 opacity-80">Click to open book section</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No book topics available for this subject.
          </p>
        )}
      </div>
    </div>
  );
            }
