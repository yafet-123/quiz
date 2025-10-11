import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllBooks, getGradeBook } from "../../../../data/BooksData.jsx";
import GradeSpecifiedBooks from "../../../../components/books/GradeSpecifiedBooks";

export default function BookGradeDetail({ grades, all_grade_books }) {
  console.log(grades);
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`MatricMate`} />
      <GradeSpecifiedBooks grades={grades} />
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const gradeId = context.params.gradeId;
  const grades = getGradeBook(gradeId);
  const all_grade_books = getAllBooks();

  if (!all_grade_books) {
    return {
      notFound: true,
    };
  }

  if (!grades) {
    return {
      notFound: true,
    };
  }

  return {
    props: { grades: grades, all_grade_books: all_grade_books },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const grades = getAllBooks();
  //   console.log(context)

  // Get the paths we want to pre-render based on grades
  const paths = grades.map((book) => ({
    params: { gradeId: book.grade },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};
