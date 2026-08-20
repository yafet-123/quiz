import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { topicId } = context.params;

  try {
    const topic = await prisma.WorksheetTopic.findUnique({
      where: { id: Number(topicId) },
      select: {
        id: true,
        title: true,
        Subject: { select: { id: true, name: true } },
      },
    });

    const worksheets = await prisma.Worksheet.findMany({
      where: { worksheetTopicId: Number(topicId) },
      include: {
        WorksheetTopic: {
          include: { Subject: { select: { name: true } } },
        },
        _count: { select: { Questions: true } },
      },
      orderBy: { id: "desc" },
    });

    return {
      props: {
        topicTitle: topic?.title || "Worksheets",
        subjectName: worksheets[0]?.WorksheetTopic?.Subject?.name || topic?.Subject?.name || "",
        worksheets: JSON.parse(JSON.stringify(worksheets)),
      },
    };
  } catch (error) {
    console.error("Error fetching worksheets:", error);
    return {
      props: { topicTitle: "Worksheets", subjectName: "", worksheets: [] },
    };
  }
}

export default function WorksheetList({ topicTitle, subjectName, worksheets }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Worksheets" />
      <div className="py-32 px-5 lg:px-20">
        <h1 className="text-3xl font-bold mb-2">{topicTitle}</h1>
        <p className="text-gray-500 text-md mb-8">Select a worksheet to start practising.</p>

        {worksheets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worksheets.map((worksheet) => (
              <Link
                key={worksheet.id}
                href={`/study/worksheet/${subjectName}/question/${worksheet.id}`}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">{worksheet.title}</h3>
                <p className="text-sm text-blue-600">Start Worksheet →</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no worksheets in this topic. Please check back later.
          </p>
        )}
      </div>
    </React.Fragment>
  );
}