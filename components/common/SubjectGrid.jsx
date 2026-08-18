import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFolder, FaArrowRight } from "react-icons/fa6";
import { Reveal } from "./Reveal";

/**
 * Reusable premium subject/category grid used across past papers, quizzes,
 * flashcards, revision notes, books, worksheets, etc. Provides glass cards,
 * hover-lift + zoom, staggered scroll-reveal, and a friendly empty state.
 *
 * items:       [{ id, name, svg?, ... }]
 * hrefPrefix:  base path, card links to `${hrefPrefix}/${item.id}`
 */
export const SubjectGrid = ({ items, hrefPrefix, emptyMessage, icon }) => {
  if (!items || items.length === 0) {
    return (
      <div className="glass-card p-12 text-center max-w-xl mx-auto">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
          {icon || <FaFolder />}
        </div>
        <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
        <p className="text-ink-500">
          {emptyMessage || "No items have been added yet. Please check back soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((subject, idx) => (
        <Reveal key={subject.id} className="h-full" delay={(idx % 6) * 60}>
          <Link
            href={subject.svg ? `${hrefPrefix}/${subject.id}` : `${hrefPrefix}/${subject.id}`}
            className="glass-card group block h-full p-4 flex flex-col"
          >
            <div className="relative w-full h-48 md:h-52 overflow-hidden rounded-xl">
              {subject.svg ? (
                <Image
                  src={subject.svg}
                  alt={subject.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-5xl">
                  {icon || <FaFolder />}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex items-center justify-between px-1 pt-4">
              <h3 className="text-xl font-bold text-ink-800 group-hover:text-primary-700 transition-colors duration-300">
                {subject.name}
              </h3>
              <span className="text-ocean-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <FaArrowRight />
              </span>
            </div>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
};

export default SubjectGrid;