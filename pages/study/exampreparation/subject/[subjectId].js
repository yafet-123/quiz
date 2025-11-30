// pages/exam-preparation/[subjectId].js
import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

    try {
    const topics = await prisma.ExamPreparationTopic.findMany({
        where: {
            examPreparation: {
            subjectId: Number(subjectId), // filter by the parent ExamPreparation's subjectId
            },
        },
        select: {
            id: true,
            title: true,
            examPrepId: true,
            examPreparation: {
            select: {
                nameOfBook: true,
                bookFile: true,
            },
            },
        },
        orderBy: {
            id: "desc",
        },
    });

    console.log(topics)
    return {
      props: {
        topics: JSON.parse(JSON.stringify(topics)),
      },
    };
  } catch (error) {
    console.error("Error fetching exam preparation:", error);
    return {
      props: {
        topics: [],
        error: "Failed to load exam preparation.",
      },
    };
  }
}

export default function ExamPreparationBySubject({ topics }) {
  const router = useRouter();

  const goToTopicDetail = (topicId) => {
    router.push(`/study/exampreparation/${topicId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Exam Preparation Subject Page" />
      <div>
        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
                onClick={() => goToTopicDetail(topic.id)}
              >
                <h2 className="font-bold text-xl md:text-2xl">
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm md:text-base opacity-80">
                  Click to open study materials
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no Exam Preparation topics for this subject. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
