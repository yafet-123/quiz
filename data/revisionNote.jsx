const RevisionNotesArray = [
  {
    id: "Elements-of-Art-and-Design",
    title: "Elements of Art and Design",
    subject: "Art",
    description:
      "Quick summary of line, color, texture, and balance. Focus on key definitions and visual examples.",
    file: "/revision/art/elements-of-art.pdf",
    unit: 1,
    page: 5,
  },
  {
    id: "Cell-Structure-and-Function",
    title: "Cell Structure and Function",
    subject: "Biology",
    description:
      "Key organelles, cell theory, and functions summarized with diagrams for fast revision.",
    file: "/revision/biology/cell-structure.pdf",
    unit: 2,
    page: 6,
  },
  {
    id: "Chemical-Bonding-and-Reactions",
    title: "Chemical Bonding and Reactions",
    subject: "Chemistry",
    description:
      "Quick notes on ionic, covalent, metallic bonds, and example reactions for review.",
    file: "/revision/chemistry/chemical-bonding.pdf",
    unit: 3,
    page: 7,
  },
  {
    id: "Introduction-to-Algorithms",
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    description:
      "Summary of key algorithms, pseudocode, and flowcharts for rapid understanding.",
    file: "/revision/computer-science/introduction-to-algorithms.pdf",
    unit: 1,
    page: 6,
  },
  {
    id: "Stacks-and-Queues-Overview",
    title: "Stacks and Queues Overview",
    subject: "Data Structures",
    description:
      "Core concepts and implementation notes of stacks and queues with examples for quick review.",
    file: "/revision/data-structures/stacks-queues.pdf",
    unit: 3,
    page: 8,
  },
  {
    id: "Photosynthesis-and-Respiration",
    title: "Photosynthesis and Respiration",
    subject: "Biology",
    description:
      "Quick comparison of photosynthesis vs respiration, key equations, and essential diagrams.",
    file: "/revision/biology/photosynthesis-respiration.pdf",
    unit: 4,
    page: 6,
  },
  {
    id: "Newton’s-Laws-of-Motion",
    title: "Newton’s Laws of Motion",
    subject: "Physics",
    description:
      "Summarized three laws of motion with key examples and diagrams for rapid revision.",
    file: "/revision/physics/newtons-laws.pdf",
    unit: 2,
    page: 5,
  },
  {
    id: "Functions-and-Graphs",
    title: "Functions and Graphs",
    subject: "Mathematics",
    description:
      "Quick notes on functions, graph transformations, and important formulas for review.",
    file: "/revision/mathematics/functions-and-graphs.pdf",
    unit: 6,
    page: 7,
  },
  {
    id: "Loops-and-Conditional-Statements",
    title: "Loops and Conditional Statements",
    subject: "Programming",
    description:
      "Short summary of loops and conditionals with code examples for quick reference.",
    file: "/revision/programming/loops-conditionals.pdf",
    unit: 3,
    page: 5,
  },
  {
    id: "Variables-and-Data-Types",
    title: "Variables and Data Types",
    subject: "Programming Fundamentals",
    description:
      "Key points on variable types, scope, and usage across different programming languages.",
    file: "/revision/programming-fundamentals/variables-data-types.pdf",
    unit: 1,
    page: 4,
  },
];

export function getAllRevisionNotes() {
  return RevisionNotesArray;
}

export function getRevisionNotesById(id) {
  return RevisionNotesArray.filter((note) => note.id === id);
}

export function getRevisionNotesBySubject(subject) {
  return RevisionNotesArray.filter((note) => note.subject === subject);
}
