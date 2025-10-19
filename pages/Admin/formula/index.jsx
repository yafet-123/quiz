import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddFormula } from "../../../components/Admin/formula/AddFormula";
import { DisplayFormula } from "../../../components/Admin/formula/DisplayFormula";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;
 
  // Optionally redirect non-admins
  // if (userRole !== 'admin') {
  //   return {
  //     redirect: {
  //       destination: '/auth/Admin/Login/signin-user',
  //       permanent: false,
  //     },
  //   };
  // }

  // Fetch all subjects with quizzes and questions
  const subjects = await prisma.Subject.findMany({
  include: {
    FormulaSheet: {
      include: {
        Topic: true, // single object
      },
    },
  },
  orderBy: { createdAt: "desc" },
});

// Format data
const formattedSubjects = subjects.map((sub) => ({
  id: sub.id,
  name: sub.name,
  description: sub.description,
  FormulaSheet: sub.FormulaSheet.map((sheet) => ({
    id: sheet.id,
    title: sheet.title,
    formula: sheet.formula,
    Topic: sheet.Topic ? { id: sheet.Topic.id, name: sheet.Topic.name } : null,
  })),
}));

console.log(JSON.stringify(formattedSubjects, null, 2));


  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    }
  };
}

export default function QuizzesPage({ subjects }) {
  const { data } = useSession();
  console.log(subjects)
  return (
    <React.Fragment>
      <MainHeader title="Quizzes Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-24">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Quiz & Questions Form */}
            <AddFormula subjects={subjects} />

            {/* Display Existing Quizzes & Questions */}
            <DisplayFormula subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
