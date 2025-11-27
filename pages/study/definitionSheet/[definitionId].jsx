// pages/definition-sheets/detail/[definitionId].js
import { MainHeader } from "../../../components/common/MainHeader";
import { prisma } from "../../../util/db.server";
import Link from "next/link";
import React from "react";

export default function DefinitionSheetDetail({ sheet }) {
  if (!sheet) {
    return (
      <div className="py-32 text-center text-gray-600">
        <MainHeader title="Aceit : Definition Sheet Individual Page" />
        <p>Definition sheet not found.</p>
      </div>
    );
  }

  return (
    <div className="antialiased bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <MainHeader title="MatricMate" />

      <div className="min-h-screen py-24 px-4 md:px-10">
        {/* Breadcrumb / Navigation */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Link href="/">
              <p className="text-emerald-600 font-semibold hover:underline cursor-pointer">
                Home
              </p>
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-gray-700 font-medium">{sheet.Subject.name}</p>
            <span className="text-gray-400">/</span>
            <p className="text-gray-900 font-bold">{sheet.title}</p>
          </div>

          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Created: {new Date(sheet.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Definition Sheet Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {sheet.title}
          </h1>

          <p className="text-gray-500 mb-8">
            Subject:{" "}
            <span className="text-emerald-600 font-semibold">
              {sheet.Subject.name}
            </span>
          </p>

          {/* Definitions List */}
          <div className="space-y-6">
            {sheet.Definitions.length > 0 ? (
              sheet.Definitions.map((def) => (
                <div
                  key={def.id}
                  className="border border-gray-200 p-6 rounded-xl hover:shadow-md transition bg-gray-50"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {def.term}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    <span className="font-bold">Meaning:</span> 
                    <div
                      className="prose max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: def.meaning }}
                    ></div>
                  </p>
                  {def.example && (
                    <p className="text-gray-600 italic">
                      <span className="font-bold">Example:</span> 
                      <div
                      className="prose max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: def.example }}
                    ></div>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No definitions found.</p>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-10">
            <Link
              href={`/study/definitionSheet/subject/${sheet.Subject.id}`}
            > 
              <a className="inline-block px-6 py-3 bg-[#9234eb] text-white rounded-lg hover:bg-[#c99bf4] hover:text-[#000] transition">
                Back to Definition Sheets
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Server-Side Data Fetching
export async function getServerSideProps(context) {
  const { definitionId } = context.params;

  try {
    const sheet = await prisma.DefinitionSheet.findUnique({
      where: { id: Number(definitionId) },
      include: {
        Subject: true,
        Definitions: true, // include all terms in this sheet
      },
    });

    return {
      props: {
        sheet: JSON.parse(JSON.stringify(sheet)),
      },
    };
  } catch (error) {
    console.error("Error fetching definition sheet:", error);
    return {
      props: {
        sheet: null,
        error: "Failed to load definition sheet.",
      },
    };
  }
}
