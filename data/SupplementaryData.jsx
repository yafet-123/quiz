const BooksSummaryArray = [
  // 🎨 ART 
  {
    id: "1",
    name: "Introduction to Art & Design",
    subject: "Art",
    description:
      "A comprehensive guide to artistic expression, covering drawing, color theory, and creative design. This book inspires creativity and builds fundamental artistic skills.",
    files: ["/books/art/introduction-to-art.pdf"],
    unit: 6,
    page: 120,
  },
  {
    id: "2",
    name: "Modern Visual Arts",
    subject: "Art",
    description:
      "Explores modern artistic movements, techniques, and digital art practices. Perfect for students developing their visual creativity and style.",
    files: ["/books/art/modern-visual-arts.pdf"],
    unit: 8,
    page: 140,
  },

  // 🧬 BIOLOGY
  {
    id: "3",
    name: "Fundamentals of Biology",
    subject: "Biology",
    description:
      "Covers essential biological concepts including cell structure, genetics, evolution, and ecosystems. Ideal for students exploring the living world.",
    files: ["/books/biology/fundamentals-of-biology.pdf"],
    unit: 10,
    page: 180,
  },
  {
    id: "4",
    name: "Human Anatomy and Physiology",
    subject: "Biology",
    description:
      "A deep dive into the human body's systems, organs, and biological functions. Includes diagrams and activities for better understanding.",
    files: ["/books/biology/human-anatomy.pdf"],
    unit: 9,
    page: 210,
  },

  // ⚗️ CHEMISTRY
  {
    id: "5",
    name: "General Chemistry Principles",
    subject: "Chemistry",
    description:
      "Explains the structure of matter, chemical reactions, and the periodic table. Designed to develop analytical thinking through experiments and real-world applications.",
    files: ["/books/chemistry/general-chemistry-principles.pdf"],
    unit: 8,
    page: 200,
  },
  {
    id: "6",
    name: "Organic and Inorganic Chemistry",
    subject: "Chemistry",
    description:
      "Explores the properties and reactions of organic and inorganic compounds. A practical guide for understanding chemical transformations.",
    files: ["/books/chemistry/organic-inorganic-chemistry.pdf"],
    unit: 10,
    page: 220,
  },

  // 💻 COMPUTER SCIENCE
  {
    id: "7",
    name: "Foundations of Computer Science",
    subject: "Computer Science",
    description:
      "An introduction to computer systems, algorithms, and data representation. Students will learn how computers process information and solve complex problems.",
    files: ["/books/computer-science/foundations-of-computer-science.pdf"],
    unit: 7,
    page: 160,
  },
  {
    id: "8",
    name: "Computer Networks and Systems",
    subject: "Computer Science",
    description:
      "Covers network architectures, protocols, and security fundamentals. A must-read for students interested in communication technologies.",
    files: ["/books/computer-science/computer-networks.pdf"],
    unit: 8,
    page: 190,
  },

  // 🧠 COMPUTER SCIENCE BASICS
  {
    id: "9",
    name: "Computer Science Basics for Beginners",
    subject: "Computer Science Basics",
    description:
      "A simplified introduction to computer science concepts including hardware, software, logic, and binary systems. Perfect for newcomers to computing.",
    files: ["/books/computer-science-basics/computer-science-basics.pdf"],
    unit: 5,
    page: 110,
  },
  {
    id: "10",
    name: "Intro to Digital Systems",
    subject: "Computer Science Basics",
    description:
      "Introduces binary arithmetic, data storage, and digital logic design. Lays the groundwork for understanding computer hardware operations.",
    files: ["/books/computer-science-basics/intro-to-digital-systems.pdf"],
    unit: 6,
    page: 125,
  },

  // 🧩 DATA STRUCTURES
  {
    id: "11",
    name: "Data Structures and Algorithms",
    subject: "Data Structures",
    description:
      "A detailed exploration of arrays, stacks, queues, trees, and graphs. Includes coding examples and performance analysis for efficient problem-solving.",
    files: ["/books/data-structures/data-structures-and-algorithms.pdf"],
    unit: 9,
    page: 190,
  },
  {
    id: "12",
    name: "Algorithm Design Techniques",
    subject: "Data Structures",
    description:
      "Covers searching, sorting, and optimization algorithms with time complexity analysis and practical examples.",
    files: ["/books/data-structures/algorithm-design.pdf"],
    unit: 8,
    page: 170,
  },

  // 🌍 GEOGRAPHY
  {
    id: "13",
    name: "Understanding Geography",
    subject: "Geography",
    description:
      "Explores Earth's physical and human geography, climate systems, and global interconnections. Encourages spatial thinking and environmental awareness.",
    files: ["/books/geography/understanding-geography.pdf"],
    unit: 6,
    page: 150,
  },
  {
    id: "14",
    name: "World Geography and Climate",
    subject: "Geography",
    description:
      "Covers continents, landforms, and global climate patterns with case studies on human-environment interaction.",
    files: ["/books/geography/world-geography.pdf"],
    unit: 7,
    page: 160,
  },

  // 🏛️ HISTORY
  {
    id: "15",
    name: "World History and Civilizations",
    subject: "History",
    description:
      "Traces human history from ancient to modern times, examining cultures, revolutions, and major events that shaped civilizations.",
    files: ["/books/history/world-history-and-civilizations.pdf"],
    unit: 10,
    page: 210,
  },
  {
    id: "16",
    name: "African History and Culture",
    subject: "History",
    description:
      "Explores the heritage, kingdoms, and colonial periods of Africa, highlighting cultural diversity and resilience.",
    files: ["/books/history/african-history.pdf"],
    unit: 9,
    page: 180,
  },

  // ➕ MATHEMATICS
  {
    id: "17",
    name: "Advanced Mathematics Concepts",
    subject: "Mathematics",
    description:
      "A complete study of algebra, geometry, trigonometry, and calculus concepts. Enhances logical reasoning and quantitative problem-solving skills.",
    files: ["/books/mathematics/advanced-mathematics.pdf"],
    unit: 12,
    page: 230,
  },
  {
    id: "18",
    name: "Applied Mathematics",
    subject: "Mathematics",
    description:
      "Focuses on real-world problem-solving using mathematical models and statistics. Great for students linking math with science and technology.",
    files: ["/books/mathematics/applied-mathematics.pdf"],
    unit: 10,
    page: 200,
  },

  // ⚡ PHYSICS
  {
    id: "19",
    name: "Physics for Secondary Students",
    subject: "Physics",
    description:
      "Introduces key physics principles such as motion, energy, electricity, and waves, supported with experiments and real-world applications.",
    files: ["/books/physics/physics-for-secondary-students.pdf"],
    unit: 9,
    page: 175,
  },
  {
    id: "20",
    name: "Advanced Mechanics and Waves",
    subject: "Physics",
    description:
      "Covers classical mechanics, harmonic motion, and energy transformations with practical experiments.",
    files: ["/books/physics/advanced-mechanics.pdf"],
    unit: 8,
    page: 190,
  },

  // 💻 PROGRAMMING
  {
    id: "21",
    name: "Introduction to Programming",
    subject: "Programming",
    description:
      "Covers basic programming concepts such as loops, conditionals, and data types with examples in JavaScript and Python.",
    files: ["/books/programming/introduction-to-programming.pdf"],
    unit: 8,
    page: 160,
  },
  {
    id: "22",
    name: "Object-Oriented Programming",
    subject: "Programming",
    description:
      "Focuses on OOP principles like classes, inheritance, and polymorphism with real coding examples.",
    files: ["/books/programming/object-oriented-programming.pdf"],
    unit: 9,
    page: 180,
  },

  // 🧑‍💻 PROGRAMMING FUNDAMENTALS
  {
    id: "23",
    name: "Programming Fundamentals",
    subject: "Programming Fundamentals",
    description:
      "Teaches the essential foundations of coding, including syntax, debugging, and logic design. Ideal for beginners learning to code effectively.",
    files: ["/books/programming-fundamentals/programming-fundamentals.pdf"],
    unit: 7,
    page: 140,
  },
  {
    id: "24",
    name: "Intro to Software Development",
    subject: "Programming Fundamentals",
    description:
      "Covers basic development workflows, source control, and structured problem-solving approaches for beginners.",
    files: ["/books/programming-fundamentals/intro-to-software-dev.pdf"],
    unit: 8,
    page: 160,
  },

  // 🔬 SCIENCE
  {
    id: "25",
    name: "General Science for Beginners",
    subject: "Science",
    description:
      "An integrated overview of biology, chemistry, and physics to develop scientific literacy and experimental understanding.",
    files: ["/books/science/general-science.pdf"],
    unit: 10,
    page: 190,
  },
  {
    id: "26",
    name: "Applied Environmental Science",
    subject: "Science",
    description:
      "Explores environmental systems, conservation, and the impact of human activity on ecosystems.",
    files: ["/books/science/applied-environmental-science.pdf"],
    unit: 9,
    page: 175,
  },

  // ⚙️ TECHNOLOGY
  {
    id: "27",
    name: "Introduction to Technology & Innovation",
    subject: "Technology",
    description:
      "Explores technological progress and its impact on modern life. Covers digital tools, automation, and emerging innovations shaping the future.",
    files: ["/books/technology/introduction-to-technology.pdf"],
    unit: 6,
    page: 130,
  },
  {
    id: "28",
    name: "Engineering and Design Basics",
    subject: "Technology",
    description:
      "Covers design thinking, prototyping, and basic engineering principles for creating innovative solutions.",
    files: ["/books/technology/engineering-design-basics.pdf"],
    unit: 8,
    page: 150,
  },

  // 🧑‍🎓 EXTRA SUBJECTS
  {
    id: "29",
    name: "Scientific Research Methods",
    subject: "Science",
    description:
      "Introduces students to the process of scientific inquiry, hypothesis testing, and data interpretation.",
    files: ["/books/science/scientific-research-methods.pdf"],
    unit: 7,
    page: 160,
  },
  {
    id: "30",
    name: "Digital Literacy and Society",
    subject: "Technology",
    description:
      "Examines the role of technology in society, ethical considerations, and digital communication skills.",
    files: ["/books/technology/digital-literacy.pdf"],
    unit: 7,
    page: 140,
  },
];


export function getFeaturedBooks() {
  return BooksSummaryArray.filter((book) => book.isFeatured);
}

export function getAllBooks() {
  return BooksSummaryArray;
}

export function getBookById(id) {
  return BooksSummaryArray.filter((book) => book.id === id);
}

export function getSubjectBook(subject) {
  return BooksSummaryArray.filter((book) => book.subject === subject);
}