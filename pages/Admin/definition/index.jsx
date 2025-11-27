import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddDefinition } from "../../../components/Admin/definition/AddDefinition";
import { DisplayDefinition } from "../../../components/Admin/definition/DisplayDefinition";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Optional admin-only access
  if (userRole !== "admin") {
    return {
      redirect: {
        destination: "/auth/Admin/Login/signin-user",
        permanent: false,
      },
    };
  }

  // ✅ Fetch all subjects with their definition sheets & definitions
  const subjects = await prisma.Subject.findMany({
    include: {
      DefinitionSheet: {
        include: {
          Definitions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  console.log(subjects)
  // ✅ Format data for the frontend
  const formattedSubjects = subjects.map((sub) => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    DefinitionSheet: sub.DefinitionSheet.map((sheet) => ({
      id: sheet.id,
      title: sheet.title,
      description: sheet.description,
      createdAt: sheet.createdAt,
      createdBy: sheet.User?.name || "Unknown",
      Definitions: sheet.Definitions.map((def) => ({
        id: def.id,
        term: def.term,
        meaning: def.meaning,
        example: def.example,
        createdBy: def.User?.name || "Unknown",
      })),
    })),
  }));

  console.log(formattedSubjects)
  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
      userId: session?.user?.user_id
    },
  };
}

export default function DefinitionPage({ subjects, userId }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Definition Sheet Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#f2f2f2] pt-24">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />

          <div className="w-full px-6">
            {/* ✅ Add New Definition Sheet Form */}
            <AddDefinition subjects={subjects} userId={userId} />

            {/* ✅ Display Existing Definition Sheets */}
            <DisplayDefinition subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
