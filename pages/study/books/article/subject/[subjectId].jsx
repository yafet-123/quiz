import { useRouter } from "next/router";
import { prisma } from "../../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params; // get subjectId from the URL

  try { 
    const articles = await prisma.Article.findMany({
      where: { subjectId: Number(subjectId) },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc", // most recent first
      },
    });

    console.log("Fetched articles:", articles);

    return {
      props: {
        articles: JSON.parse(JSON.stringify(articles)), // serialize for Next.js
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [],
        error: "Failed to load articles.",
      },
    };
  }
}

export default function SubjectArticles({ articles }) {
  const router = useRouter();

  const goToDetail = (slug) => {
    // navigate to article detail page by slug
    router.push(`/study/books/article/${slug}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Supplementary Subject" />
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              onClick={() => goToDetail(article.slug)}
            >
              <h2 className="font-bold text-xl md:text-2xl">{article.title}</h2>
              <p className="mt-2 text-sm md:text-base opacity-80">
                Click to read full article
              </p>
              <p className="mt-1 text-xs opacity-70">
                Published: {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          There are currently no Article available for this subject. Please check back later.
        </p>
      )}
    </div>
  );
}
