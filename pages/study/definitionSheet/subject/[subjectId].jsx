// pages/definition-sheets/[subjectId].js
import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const sheets = await prisma.DefinitionSheet.findMany({
      where: { subjectId: Number(subjectId) },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      props: {
        sheets: JSON.parse(JSON.stringify(sheets)),
      },
    };
  } catch (error) {
    console.error("Error fetching definition sheets:", error);
    return {
      props: {
        sheets: [],
        error: "Failed to load definition sheets.",
      },
    };
  }
}

export default function SubjectDefinitionSheets({ sheets }) {
  const router = useRouter();

  const goToSheetDetail = (sheetId) => {
    router.push(`/study/definitionSheet/${sheetId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Definition Sheet Subject Page" />
      <div>
        {sheets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sheets.map((sheet) => (
              <div
                key={sheet.id}
                className="cursor-pointer bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
                onClick={() => goToSheetDetail(sheet.id)}
              >
                <h2 className="font-bold text-xl md:text-2xl">{sheet.title}</h2>
                <p className="mt-2 text-sm md:text-base opacity-80">
                  Click to view full definitions
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no Definition Sheet available for this subject. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
