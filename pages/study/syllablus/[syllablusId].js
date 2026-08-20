import React from "react";
import { prisma } from "../../../util/db.server";
import { FaGraduationCap } from "react-icons/fa";
import { MainHeader } from "../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { syllablusId } = context.params;

  try {
    const category = await prisma.syllablusCategory.findUnique({
      where: { id: Number(syllablusId) },
      include: {
        Syllablus: true,
      },
    });

    if (!category) {
      return { notFound: true };
    }

    return {
      props: {
        categoryTitle: category.title,
        items: JSON.parse(JSON.stringify(category.Syllablus || [])),
      },
    };
  } catch (error) {
    console.error("Error fetching syllabus category detail:", error);
    return {
      props: {
        categoryTitle: "",
        items: [],
      },
    };
  }
}

export default function SyllablusDetailPage({ categoryTitle, items }) {
  const getLink = (content) => {
    if (!content) return "#";
    const trimmed = content.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (trimmed.startsWith("www.") || trimmed.includes("drive.google.com") || trimmed.includes("dropbox.com")) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  return (
    <>
      <MainHeader title={`Aceit : ${categoryTitle}`} />

      <div className="py-32 px-5 lg:px-20 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{categoryTitle}</h1>

        {items.length === 0 ? (
          <p className="text-gray-600 text-lg">
            No syllabus available for this category yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const link = getLink(item.content);
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-[#f8f8f9] py-5 px-6 rounded-2xl hover:bg-[#ededf2] mb-3 transition"
                >
                  <div className="flex items-center">
                    <FaGraduationCap size={40} color="#3699ff" />
                    <h2 className="pl-4 text-black font-bold text-md md:text-lg">
                      {item.title}
                    </h2>
                  </div>

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#3699ff] hover:bg-[#002244] text-white px-4 py-2 rounded-2xl text-md md:text-lg font-bold transition"
                  >
                    Open Syllabus
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
