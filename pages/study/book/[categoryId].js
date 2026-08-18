import React from "react";
import { prisma } from "../../../util/db.server";
import { FaBook } from "react-icons/fa";
import { MainHeader } from "../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { categoryId } = context.params;

  try {
    // Fetch the category with its Books
    const category = await prisma.BookCategory.findUnique({
      where: { id: Number(categoryId) },
      include: {
        Books: true, // include all books under this category
      },
    });

    if (!category) {
      return { notFound: true };
    }

    // Build book list from category's books
    const books = (category.Books || []).map((book) => ({
      name: book.title,
      link: book.bookFile,
    }));

    return {
      props: {
        categoryTitle: category.title,
        books,
      },
    };
  } catch (error) {
    console.error("Error fetching book category:", error);
    return {
      props: {
        categoryTitle: "",
        books: [],
      },
    };
  }
}

export default function BookCategoryPage({ categoryTitle, books }) {
  return (
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <MainHeader title={`Aceit : ${categoryTitle} Books`} />

      <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>

      {books.length === 0 && (
        <p className="text-gray-600 text-lg">No books available for this category.</p>
      )}

      <div className="flex flex-col">
        {books.map((book, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[#f8f8f9] py-5 px-4 rounded-2xl hover:bg-[#ededf2] mb-5"
          >
            <div className="flex items-center">
              <FaBook size={40} color="#3699ff" />
              <h1 className="pl-4 text-black font-bold text-md md:text-lg">{book.name}</h1>
            </div>

            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3699ff] hover:bg-[#002244] text-white px-3 py-2 rounded-2xl text-md md:text-lg font-bold"
            >
              Open Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}