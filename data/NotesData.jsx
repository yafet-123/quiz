const NotesSummaryArray = [
  {
    id: "Elements-of-Art-and-Design",
    title: "Elements of Art and Design",
    subject: "Art",
    description:
      "Detailed notes on the basic elements of art including line, color, texture, and balance. Ideal for visual analysis and creative projects.",
    file: "/notes/art/elements-of-art.pdf",
    unit: 1,
    page: 15,
  },
  {
    id: "Cell-Structure-and-Function",
    title: "Cell Structure and Function",
    subject: "Biology",
    description:
      "Comprehensive notes explaining cell organelles, their roles, and cell theory with diagrams and definitions.",
    file: "/notes/biology/cell-structure.pdf",
    unit: 2,
    page: 18,
  },
  {
    id: "Chemical-Bonding-and-Reactions",
    title: "Chemical Bonding and Reactions",
    subject: "Chemistry",
    description:
      "Explains ionic, covalent, and metallic bonds with examples and practice problems.",
    file: "/notes/chemistry/chemical-bonding.pdf",
    unit: 3,
    page: 20,
  },
  {
    id: "Introduction-to-Algorithms",
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    description:
      "A clear explanation of algorithms, pseudocode, and flowcharts to strengthen logical thinking in computing.",
    file: "/notes/computer-science/introduction-to-algorithms.pdf",
    unit: 1,
    page: 16,
  },
  {
    id: "Basics-of-Computer-Hardware",
    title: "Basics of Computer Hardware",
    subject: "Computer Science Basics",
    description:
      "Detailed overview of hardware components including CPU, memory, and storage devices with labeled diagrams.",
    file: "/notes/computer-science-basics/hardware-basics.pdf",
    unit: 2,
    page: 14,
  },
  {
    id: "Stacks-and-Queues-Overview",
    title: "Stacks and Queues Overview",
    subject: "Data Structures",
    description:
      "Notes on stack and queue implementation with real-world applications and code examples.",
    file: "/notes/data-structures/stacks-queues.pdf",
    unit: 3,
    page: 22,
  },
  {
    id: "Human-Geography:-Population-and-Culture",
    title: "Human Geography: Population and Culture",
    subject: "Geography",
    description:
      "In-depth notes on global population trends, migration, and cultural diffusion with maps and case studies.",
    file: "/notes/geography/population-culture.pdf",
    unit: 4,
    page: 19,
  },
  {
    id: "World-War-II-Summary",
    title: "World War II Summary",
    subject: "History",
    description:
      "A concise summary of the causes, key battles, and aftermath of World War II, with timelines and analysis.",
    file: "/notes/history/world-war-2.pdf",
    unit: 5,
    page: 17,
  },
  {
    id: "Functions-and-Graphs",
    title: "Functions and Graphs",
    subject: "Mathematics",
    description:
      "Comprehensive notes explaining functions, graph transformations, and real-world applications.",
    file: "/notes/mathematics/functions-and-graphs.pdf",
    unit: 6,
    page: 21,
  },
  {
    id: "Newton’s-Laws-of-Motion",
    title: "Newton’s Laws of Motion",
    subject: "Physics",
    description:
      "Explains the three laws of motion with examples, diagrams, and practical problems.",
    file: "/notes/physics/newtons-laws.pdf",
    unit: 2,
    page: 18,
  },
  {
    id: "Loops-and-Conditional-Statements",
    title: "Loops and Conditional Statements",
    subject: "Programming",
    description:
      "Explains how to control program flow using loops and conditions, with examples in Python and JavaScript.",
    file: "/notes/programming/loops-conditionals.pdf",
    unit: 3,
    page: 16,
  },
  {
    id: "Variables-and-Data-Types",
    title: "Variables and Data Types",
    subject: "Programming Fundamentals",
    description:
      "Notes on variable declaration, scope, and data types across different programming languages.",
    file: "/notes/programming-fundamentals/variables-data-types.pdf",
    unit: 1,
    page: 12,
  },
  {
    id: "Introduction-to-Scientific-Method",
    title: "Introduction to Scientific Method",
    subject: "Science",
    description:
      "Explains the steps of scientific investigation and how hypotheses are tested through experimentation.",
    file: "/notes/science/scientific-method.pdf",
    unit: 1,
    page: 14,
  },
  {
    id: "Emerging-Technologies-Overview",
    title: "Emerging Technologies Overview",
    subject: "Technology",
    description:
      "Covers AI, IoT, and robotics innovations that shape the modern digital landscape.",
    file: "/notes/technology/emerging-technologies.pdf",
    unit: 5,
    page: 20,
  },
  {
    id: "Photosynthesis-and-Respiration",
    title: "Photosynthesis and Respiration",
    subject: "Biology",
    description:
      "Detailed comparison between photosynthesis and cellular respiration, with chemical equations and diagrams.",
    file: "/notes/biology/photosynthesis-respiration.pdf",
    unit: 4,
    page: 19,
  },
  {
    id: "Periodic-Table-and-Atomic-Structure",
    title: "Periodic Table and Atomic Structure",
    subject: "Chemistry",
    description:
      "Notes on atomic models, periodic trends, and electron configurations.",
    file: "/notes/chemistry/atomic-structure.pdf",
    unit: 2,
    page: 17,
  },
  {
    id: "Data-Representation-in-Computers",
    title: "Data Representation in Computers",
    subject: "Computer Science",
    description:
      "Explains binary, hexadecimal, and data encoding methods with examples.",
    file: "/notes/computer-science/data-representation.pdf",
    unit: 3,
    page: 15,
  },
  {
    id: "Linear-Equations-and-Inequalities",
    title: "Linear Equations and Inequalities",
    subject: "Mathematics",
    description:
      "Covers solving linear equations, graphing inequalities, and system of equations techniques.",
    file: "/notes/mathematics/linear-equations.pdf",
    unit: 2,
    page: 18,
  },
  {
    id: "Electric-Circuits-Basics",
    title: "Electric-Circuits-Basics",
    subject: "Physics",
    description:
      "Introduces Ohm’s Law, circuit diagrams, and resistance calculations with examples.",
    file: "/notes/physics/electric-circuits.pdf",
    unit: 4,
    page: 19,
  },
  {
    id: "Software-Development-Life-Cycle-(SDLC)",
    title: "Software Development Life Cycle (SDLC)",
    subject: "Technology",
    description:
      "Notes outlining each phase of SDLC with examples from modern software projects.",
    file: "/notes/technology/sdlc.pdf",
    unit: 3,
    page: 16,
  },
];

export function getAllNotes() {
  return NotesSummaryArray;
}

export function getNotesById(id) {
  return NotesSummaryArray.filter((note) => note.id === id);
}
