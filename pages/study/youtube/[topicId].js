import React from "react";
import { prisma } from "../../../util/db.server";
import { FaYoutube } from "react-icons/fa";
import { MainHeader } from "../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { topicId } = context.params;

  try {
    // Fetch the topic with its YoutubeLink
    const topic = await prisma.YoutubeLinkTopic.findUnique({
      where: { id: Number(topicId) },
      include: {
        YoutubeLink: true, // include the parent YoutubeLink (capitalized to match Prisma relation)
      },
    });

    if (!topic) {
      return { notFound: true };
    }

    // If url contains multiple links separated by comma
    const linkNames = topic.YoutubeLink?.title ? topic.YoutubeLink.title.split(",") : [];
    const linkUrls = topic.YoutubeLink?.url ? topic.YoutubeLink.url.split(",") : [];

    const links = linkNames.map((name, index) => ({
      name: name.trim(),
      url: linkUrls[index] ? linkUrls[index].trim() : "#",
    }));

    return {
      props: {
        topicTitle: topic.title,
        youtubeLinkTitle: topic.YoutubeLink?.title || "",
        links,
      },
    };
  } catch (error) {
    console.error("Error fetching YouTube topic:", error);
    return {
      props: {
        topicTitle: "",
        youtubeLinkTitle: "",
        links: [],
      },
    };
  }
}

export default function YoutubeLinkTopicPage({ topicTitle, youtubeLinkTitle, links }) {
  return (
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <MainHeader title={`Aceit : ${topicTitle} YouTube Lessons`} />

      <h1 className="text-3xl font-bold mb-2">{topicTitle}</h1>
      {youtubeLinkTitle && (
        <p className="text-gray-600 text-lg mb-8">Playlist: {youtubeLinkTitle}</p>
      )}

      {links.length === 0 && (
        <p className="text-gray-600 text-lg">No YouTube links available for this topic.</p>
      )}

      <div className="flex flex-col">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[#f8f8f9] py-5 px-4 rounded-2xl hover:bg-[#ededf2] mb-5"
          >
            <div className="flex items-center">
              <FaYoutube size={40} color="#ff0000" />
              <h1 className="pl-4 text-black font-bold text-md md:text-lg">{link.name}</h1>
            </div>

            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff0000] hover:bg-[#990000] text-white px-3 py-2 rounded-2xl text-md md:text-lg font-bold"
            >
              Watch Video
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
