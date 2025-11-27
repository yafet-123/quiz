import { MainHeader } from "../../../../components/common/MainHeader";
import { prisma } from "../../../../util/db.server";
import Link from "next/link";
import React from "react";

export default function ArticleDetail({ article }) {
  if (!article) {
    return (
      <div>
        <MainHeader title="Aceit : Article Slug Page" />
        <div className="py-32 px-5 lg:px-20 text-center">
          <h2 className="text-2xl font-bold">Article not found</h2>
          <Link href="/study/books/article">
            <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Back to Articles
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <MainHeader title="Aceit : Article Slug Page" />
      <div className="antialiased bg-gradient-to-r">
        <MainHeader title="MatricMate" />
        <div className="min-h-screen bg-gray-50 py-24 px-4 md:px-10">
          {/* Breadcrumb / Navigation */}
          <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Link href="/">
                <p className="text-purple-600 font-semibold hover:underline cursor-pointer">
                  Home
                </p>
              </Link>
              <span className="text-gray-400">/</span>
              <p className="text-gray-700 font-medium">{article.Subject.name}</p>
              <span className="text-gray-400">/</span>
              <p className="text-gray-900 font-bold">{article.title}</p>
            </div>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              Published: {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Article Card */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="mb-6">
              <span className="text-sm md:text-base text-gray-500">
                Subject:{" "}
                <span className="text-purple-600 font-semibold">
                  {article.Subject.name}
                </span>
              </span>
            </div>

            <div
              className="prose prose-purple max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Back Button */}
            <div className="mt-8">
              <Link href={`/study/books/article/subject/${article.Subject.id}`}>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Back to Articles
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch article by slug
export async function getServerSideProps(context) {
  const { slug } = context.params; // get slug from the URL

  try { 
    const article = await prisma.Article.findUnique({
      where: { slug: slug },
      include: {
        Subject: true, // Include related subject
      },
    });

    return {
      props: {
        article: article ? JSON.parse(JSON.stringify(article)) : null,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      props: {
        article: null,
        error: "Failed to load article.",
      },
    };
  }
}
