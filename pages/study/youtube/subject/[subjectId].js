import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const topics = await prisma.YoutubeLinkTopic.findMany({
      where: {
        YoutubeLink: {
          subjectId: Number(subjectId),
        },
      },
      select: {
        id: true,
        title: true,
        youtubeLinkId: true,
        YoutubeLink: {
          select: {
            title: true,
            url: true,
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
    console.error("Error loading youtube topics:", error);
    return {
      props: {
        topics: [],
        error: "Failed to load YouTube topics.",
      },
    };
  }
}

export default function YoutubeBySubject({ topics }) {
  const router = useRouter();

  const openTopic = (topicId) => {
    router.push(`/study/youtube/${topicId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : YouTube Links" />
      <div>
        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => openTopic(topic.id)}
                className="cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              >
                <h2 className="font-bold text-xl md:text-2xl">{topic.title}</h2>
                <p className="mt-2 opacity-80">
                  Tap to open YouTube materials
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No YouTube topics available for this subject.
          </p>
        )}
      </div>
    </div>
  );
    }
