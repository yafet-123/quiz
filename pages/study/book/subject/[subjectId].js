import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const categories = await prisma.BookCategory.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        Books: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.error("Error loading book categories:", error);
    return {
      props: {
        categories: [],
        error: "Failed to load book categories.",
      },
    };
  }
}

export default function BooksBySubject({ categories }) {
  const router = useRouter();

  const openCategory = (categoryId) => {
    router.push(`/study/book/${categoryId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Book Categories" />
      <div>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => openCategory(category.id)}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              >
                <h2 className="font-bold text-xl md:text-2xl">{category.title}</h2>
                <p className="mt-2 opacity-80">{category.Books?.length || 0} book(s) available</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No book categories available for this subject.
          </p>
        )}
      </div>
    </div>
  );
}
