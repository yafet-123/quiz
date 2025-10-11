import { MainHeader } from "../../../../../components/common/MainHeader";
import { getAllBooks, getBookById } from "../../../../../data/SupplementaryData.jsx";
import DetailBook from "../../../../../components/books/DetailBook";

export default function BookDetail({ books, all_grade_books }) {
  books = books[0]
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`MatricMate`} />
      <DetailBook books={books} />
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const bookId = context.params.bookId;
  const books = getBookById(bookId);
  const all_grade_books = getAllBooks();

  if (!all_grade_books) {
    return {
      notFound: true,
    };
  }

  if (!books) {
    return {
      notFound: true,
    };
  }

  return {
    props: { books, all_grade_books },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const books = getAllBooks();
  //   console.log(context)

  // Get the paths we want to pre-render based on books
  const paths = books.map((book) => ({
    params: { bookId: book.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};
