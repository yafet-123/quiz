import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllBooks, getSubjectBook } from "../../../../data/SupplementaryData.jsx";
import SubjectSpecifiedBooks from "../../../../components/books/SubjectSpecifiedBooks";

export default function BookGradeDetail({ subjects, all_subject_books }) {
  console.log(subjects);
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`MatricMate`} />
      <SubjectSpecifiedBooks subjects={subjects} />
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const subjectId = context.params.subjectId;
  console.log(context)
  const subjects = getSubjectBook(subjectId);
  const all_subject_books = getAllBooks();
  console.log(subjects)
  if (!all_subject_books) {
    return {
      notFound: true,
    };
  }

  if (!subjects) {
    return {
      notFound: true,
    };
  }

  return {
    props: { subjects, all_subject_books },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const subjects = getAllBooks();
  //   console.log(context)

  // Get the paths we want to pre-render based on grades
  const paths = subjects.map((book) => ({
    params: { subjectId: book.subject },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};