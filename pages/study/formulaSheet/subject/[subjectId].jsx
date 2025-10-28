import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import { MainHeader } from "../../../../components/common/MainHeader";
import React from "react";

// Fetch formula sheets by subjectId
export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const formulaSheets = await prisma.FormulaSheet.findMany({
      where: { subjectId: Number(subjectId) },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        formula: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      props: {
        formulaSheets: JSON.parse(JSON.stringify(formulaSheets)),
      },
    };
  } catch (error) {
    console.error("Error fetching formula sheets:", error);
    return {
      props: {
        formulaSheets: [],
        error: "Failed to load formula sheets.",
      },
    };
  }
}

export default function FormulaSheetPage({ formulaSheets }) {
  const router = useRouter();

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title={`Formula Sheets`} />
      {formulaSheets.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No formula sheets found for this subject.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formulaSheets.map((sheet, index) => (
            <div
              key={sheet.id}
              className={`cursor-pointer bg-gradient-to-r ${
                index % 3 === 0
                  ? "from-teal-500 to-cyan-600"
                  : index % 3 === 1
                  ? "from-purple-500 to-indigo-600"
                  : "from-pink-500 to-rose-500"
              } text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform`}
            >
              <h2 className="font-bold text-xl md:text-2xl mb-2">{sheet.title}</h2>
              <p className="font-normal text-lg md:text-xl mb-2"> {sheet.description} </p>
              <div
                className="prose prose-purple max-w-none text-white text-lg lg:text-xl font-bold"
                dangerouslySetInnerHTML={{ __html: sheet.formula }}
              />
              <p className="mt-3 text-xs opacity-70">
                Added on: {new Date(sheet.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
