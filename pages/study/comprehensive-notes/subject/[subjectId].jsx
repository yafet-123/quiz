import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const categories = await prisma.NoteCategory.findMany({
      where: { subjectId: Number(subjectId) },
      include: {
        _count: { select: { Note: true } },
      },
      orderBy: { id: "asc" },
    });

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.error("Error fetching note categories:", error);
    return {
      props: { categories: [], error: "Failed to load note categories." },
    };
  }
}

export default function NoteCategoriesPage({ categories }) {
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Comprehensive Note Topics" />
      <h1 className="text-3xl font-bold mb-2">Comprehensive Notes</h1>
      <p className="text-gray-500 text-md mb-8">Choose a topic to view its notes.</p>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/study/comprehensive-notes/category/${category.id}`}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
            >
              <h2 className="font-bold text-xl md:text-2xl">{category.title}</h2>
              <p className="mt-2 opacity-80">
                {category._count?.Note || 0} note(s) available
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          There are currently no note topics available for this subject. Please check back later.
        </p>
      )}
    </div>
  );
}