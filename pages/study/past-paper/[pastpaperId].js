import React from "react";
import { prisma } from "../../../util/db.server";
import { FaFilePdf } from "react-icons/fa6";
import { MainHeader } from "../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { pastpaperId } = context.params;

  try {
    // Fetch the PastPaperTopic with its PastPaper
    const topic = await prisma.PastPaperTopic.findUnique({
      where: { id: Number(pastpaperId) },
      include: {
        PastPaper: true, // include the parent PastPaper
      },
    });

    if (!topic) {
      return { notFound: true };
    }

    // If paperFile contains multiple links separated by comma
    const pastPaperNames = topic.PastPaper?.title ? topic.PastPaper.title.split(",") : [];
    const paperLinks = topic.PastPaper?.paperFile ? topic.PastPaper.paperFile.split(",") : [];

    const papers = pastPaperNames.map((name, index) => ({
      name: name.trim(),
      link: paperLinks[index] ? paperLinks[index].trim() : "#",
    }));

    return {
      props: {
        topicTitle: topic.title,
        pastPaperTitle: topic.PastPaper?.title || "",
        year: topic.PastPaper?.year || null,
        papers,
      },
    };
  } catch (error) {
    console.error("Error fetching past paper topic:", error);
    return {
      props: {
        topicTitle: "",
        pastPaperTitle: "",
        year: null,
        papers: [],
      },
    };
  }
}

export default function PastPaperPage({ topicTitle, pastPaperTitle, year, papers }) {
  return (
    <>
      <MainHeader title={`Aceit : ${topicTitle}`} />

      <div className="py-32 px-5 lg:px-20">
        <h1 className="text-3xl font-bold mb-2">{topicTitle}</h1>
        {pastPaperTitle && (
          <p className="text-gray-600 text-lg mb-2">Paper: {pastPaperTitle}</p>
        )}
        {year && (
          <p className="text-gray-500 text-md mb-8">Year: {year}</p>
        )}

        {papers.length === 0 && (
          <p className="text-gray-600 text-lg">
            No past papers available for this topic.
          </p>
        )}

        <div className="flex flex-col">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#f8f8f9] py-5 px-4 rounded-2xl hover:bg-[#ededf2] mb-5"
            >
              <div className="flex items-center">
                <FaFilePdf size={40} color="#df646a" />
                <h1 className="pl-4 text-black font-bold text-md md:text-lg">
                  {paper.name}
                </h1>
              </div>

              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3699ff] hover:bg-[#002244] text-white px-3 py-2 rounded-2xl text-md md:text-lg font-bold"
              >
                Open Paper
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
