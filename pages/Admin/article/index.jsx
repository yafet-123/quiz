import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../../util/db.server.js";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from "../../../components/common/MainHeader";
import { AddArticle } from "../../../components/Admin/article/AddArticle";
import { DisplayArticles } from "../../../components/Admin/article/DisplayArticles";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Optional: restrict access to admin/teacher roles
  if (userRole !== "admin") {
    return {
      redirect: {
        destination: "/auth/Admin/Login/signin-user",
        permanent: false,
      },
    };
  }

  // Fetch all subjects with their related articles
  const subjects = await prisma.Subject.findMany({
    include: {
      Article: true
    },
    orderBy: { id: "asc" },
  });

  // Format data for the frontend
  const formattedSubjects = subjects.map((sub) => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    Articles: sub.Article.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      author: article.createdBy || "Unknown",
      image: article.image || null,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      subjectName: article.Subject?.name || "Unknown Subject",
    })),
  }));
  console.log(formattedSubjects[0].Articles)
  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function ArticlesPage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Articles Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#f5f5f5] pt-24">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />

          <div className="w-full px-6">
            {/* ✅ Add New Article Form */}
            <AddArticle subjects={subjects} />

            {/* ✅ Display Existing Articles */}
            <DisplayArticles subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
