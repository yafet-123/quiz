import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFolder } from "react-icons/fa6";

export default function Subject() {
  const subjects = [
    {
      id: 1,
      title: "Art",
      description:
        "Art encourages creativity, self-expression, and visual communication. Students explore drawing, painting, design, and other artistic techniques to express ideas and emotions through visual forms.",
      svg: "/categories/image--art.svg",
    },
    {
      id: 2,
      title: "Biology",
      description:
        "Biology is the study of living organisms, their structure, function, growth, and evolution. It helps students understand life processes and the relationships between different forms of life on Earth.",
      svg: "/categories/image--biology.svg",
    },
    {
      id: 3,
      title: "Chemistry",
      description:
        "Chemistry explores the composition, properties, and reactions of matter. Students learn how elements combine to form compounds and how chemical reactions shape the physical world.",
      svg: "/categories/image--chemistry.svg",
    },
    {
      id: 4,
      title: "Computer Science",
      description:
        "Computer Science introduces students to algorithms, programming, and computational thinking. It provides the foundation for solving real-world problems using technology and software design.",
      svg: "/categories/image--computer-science.svg",
    },
    {
      id: 5,
      title: "Computer Science Basics",
      description:
        "Computer Science Basics covers essential concepts such as data types, logic, and basic programming principles. It helps beginners build a solid foundation for more advanced computing topics.",
      svg: "/categories/image--computer-science-basics.svg",
    },
    {
      id: 6,
      title: "Data Structures",
      description:
        "Data Structures focuses on organizing and managing data efficiently. Students learn about arrays, linked lists, trees, and algorithms that form the backbone of modern software systems.",
      svg: "/categories/image--data-structures.svg",
    },
    {
      id: 7,
      title: "Geography",
      description:
        "Geography helps students understand the Earth's landscapes, environments, and human interactions. It explores global patterns, cultures, and how natural and social systems shape our world.",
      svg: "/categories/image--geography.svg",
    },
    {
      id: 8,
      title: "History",
      description:
        "History examines past events, civilizations, and cultures to understand how they shape the present. Students learn critical thinking through the study of societies, leaders, and global transformations.",
      svg: "/categories/image--history.svg",
    },
    {
      id: 9,
      title: "Mathematics",
      description:
        "Mathematics develops logical thinking and problem-solving skills through numbers, patterns, and abstract reasoning. It lays the foundation for studies in science, technology, and engineering.",
      svg: "/categories/image--mathematics.svg",
    },
    {
      id: 10,
      title: "Physics",
      description:
        "Physics explores the fundamental laws governing matter, energy, and motion. It helps students understand natural phenomena from the smallest particles to the vastness of the universe.",
      svg: "/categories/image--physics.svg",
    },
    {
      id: 11,
      title: "Programming",
      description:
        "Programming teaches students how to write code to build software, automate tasks, and solve real-world problems. It focuses on logic, algorithms, and creativity through coding projects.",
      svg: "/categories/image--programming.svg",
    },
    {
      id: 12,
      title: "Programming Fundamentals",
      description:
        "Programming Fundamentals introduces basic programming concepts such as variables, loops, and functions. It’s perfect for beginners aiming to develop a strong foundation in coding.",
      svg: "/categories/image--programming-fundamentals.svg",
    },
    {
      id: 13,
      title: "Science",
      description:
        "Science cultivates curiosity and analytical thinking through exploration of the physical and natural world. It integrates concepts from biology, chemistry, and physics to explain how the universe works.",
      svg: "/categories/image--science.svg",
    },
    {
      id: 14,
      title: "Technology",
      description:
        "Technology focuses on the practical application of scientific knowledge to create tools, systems, and solutions that improve daily life. Students explore innovations shaping the modern world.",
      svg: "/categories/image--technology.svg",
    },
  ];

  return ( 
    <div className="bg-gray-100 min-h-screen py-28">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {subjects.map((subject) => (
          <Link href={`/study/books/supplementary/${subject.title}`} key={subject.id}>
            <div
              className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl 
              transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-6"
            >
              {/* Image Section */}
              <div className="relative w-full h-64 overflow-hidden rounded-xl">
                <Image
                  src={subject.svg}
                  alt={subject.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Section */}
              <h2 className="mt-6 text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {subject.title}
              </h2>
              <p className="text-gray-600 mt-3 text-base leading-relaxed">
                {subject.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-4 w-16 h-1 bg-green-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
