const quizBySubject = [
  {
    subject: "Art",
    quizzes: [
      {
        id: 1,
        title: "Art History Quiz",
        questions: [
          {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"],
            answer: "Leonardo da Vinci",
          },
          {
            question: "Which art movement is Claude Monet associated with?",
            options: ["Cubism", "Impressionism", "Surrealism", "Expressionism"],
            answer: "Impressionism",
          },
        ],
      },
      {
        id: 2,
        title: "Color Theory Quiz",
        questions: [
          {
            question: "What are the primary colors?",
            options: ["Red, Green, Blue", "Red, Yellow, Blue", "Cyan, Magenta, Yellow", "Black, White, Gray"],
            answer: "Red, Yellow, Blue",
          },
          {
            question: "Mixing red and blue creates which color?",
            options: ["Green", "Orange", "Purple", "Brown"],
            answer: "Purple",
          },
        ],
      },
      {
        id: 3,
        title: "Famous Artists Quiz",
        questions: [
          {
            question: "Who painted 'Starry Night'?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Salvador Dalí", "Leonardo da Vinci"],
            answer: "Vincent van Gogh",
          },
          {
            question: "Which artist is known for his Blue Period?",
            options: ["Claude Monet", "Pablo Picasso", "Andy Warhol", "Rembrandt"],
            answer: "Pablo Picasso",
          },
        ],
      },
    ],
  },
  {
    subject: "Biology",
    quizzes: [
      {
        id: 1,
        title: "Cell Biology Quiz",
        questions: [
          {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            answer: "Mitochondria",
          },
          {
            question: "Which part of the cell contains genetic material?",
            options: ["Nucleus", "Cell wall", "Cytoplasm", "Membrane"],
            answer: "Nucleus",
          },
        ],
      },
      {
        id: 2,
        title: "Genetics Quiz",
        questions: [
          {
            question: "Who is known as the father of genetics?",
            options: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Watson"],
            answer: "Gregor Mendel",
          },
          {
            question: "DNA stands for what?",
            options: [
              "Deoxyribonucleic Acid",
              "Dinucleic Acid",
              "Deoxyribose Nucleic Acid",
              "Dioxygen Nucleic Acid",
            ],
            answer: "Deoxyribonucleic Acid",
          },
        ],
      },
      {
        id: 3,
        title: "Human Anatomy Quiz",
        questions: [
          {
            question: "How many bones are in the adult human body?",
            options: ["206", "208", "201", "210"],
            answer: "206",
          },
          {
            question: "What is the largest organ in the human body?",
            options: ["Liver", "Heart", "Skin", "Brain"],
            answer: "Skin",
          },
        ],
      },
    ],
  },
  {
    subject: "Mathematics",
    quizzes: [
      {
        id: 1,
        title: "Algebra Quiz",
        questions: [
          {
            question: "What is the solution of 2x + 6 = 10?",
            options: ["x=1", "x=2", "x=3", "x=4"],
            answer: "x=2",
          },
          {
            question: "What is (x + 2)(x + 3)?",
            options: ["x² + 6x + 6", "x² + 5x + 6", "x² + 4x + 5", "x² + 5x + 5"],
            answer: "x² + 5x + 6",
          },
        ],
      },
      {
        id: 2,
        title: "Geometry Quiz",
        questions: [
          {
            question: "How many degrees are in a triangle?",
            options: ["90°", "120°", "180°", "360°"],
            answer: "180°",
          },
          {
            question: "What is the area of a circle with radius r?",
            options: ["2πr", "πr²", "πd", "r²"],
            answer: "πr²",
          },
        ],
      },
      {
        id: 3,
        title: "Calculus Quiz",
        questions: [
          {
            question: "What is the derivative of x²?",
            options: ["x", "2x", "x²", "3x"],
            answer: "2x",
          },
          {
            question: "What is the integral of 1/x?",
            options: ["ln|x| + C", "x²/2", "x + C", "1/x²"],
            answer: "ln|x| + C",
          },
        ],
      },
    ],
  },
  {
    subject: "Chemistry",
    quizzes: [
      {
        id: 1,
        title: "Periodic Table Quiz",
        questions: [
          {
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Au", "Gd", "Go"],
            answer: "Au",
          },
          {
            question: "Which element has the atomic number 1?",
            options: ["Oxygen", "Nitrogen", "Hydrogen", "Helium"],
            answer: "Hydrogen",
          },
        ],
      },
      {
        id: 2,
        title: "Chemical Reactions Quiz",
        questions: [
          {
            question: "What type of reaction is 2H₂ + O₂ → 2H₂O?",
            options: ["Decomposition", "Synthesis", "Combustion", "Displacement"],
            answer: "Synthesis",
          },
          {
            question: "Which law states that mass is conserved in a chemical reaction?",
            options: [
              "Law of Constant Proportions",
              "Law of Conservation of Mass",
              "Law of Definite Composition",
              "Dalton’s Law",
            ],
            answer: "Law of Conservation of Mass",
          },
        ],
      },
      {
        id: 3,
        title: "Organic Chemistry Quiz",
        questions: [
          {
            question: "What is the simplest hydrocarbon?",
            options: ["Methane", "Ethane", "Propane", "Butane"],
            answer: "Methane",
          },
          {
            question: "What functional group is present in alcohols?",
            options: ["-OH", "-COOH", "-CHO", "-NH₂"],
            answer: "-OH",
          },
        ],
      },
    ],
  },
  {
    subject: "Computer Science",
    quizzes: [
      {
        id: 1,
        title: "C++ Quiz",
        questions: [
          {
            question: "Which symbol is used to end a statement in C++?",
            options: [":", ".", ";", ","],
            answer: ";",
          },
          {
            question: "What is used to display output in C++?",
            options: ["cin", "cout", "printf", "write"],
            answer: "cout",
          },
        ],
      },
      {
        id: 2,
        title: "JavaScript Quiz",
        questions: [
          {
            question: "Which keyword declares a variable in JavaScript?",
            options: ["var", "let", "const", "All of the above"],
            answer: "All of the above",
          },
          {
            question: "What does DOM stand for?",
            options: [
              "Document Object Model",
              "Data Object Manager",
              "Digital Output Method",
              "Document Order Mapping",
            ],
            answer: "Document Object Model",
          },
        ],
      },
      {
        id: 3,
        title: "Python Quiz",
        questions: [
          {
            question: "Which keyword defines a function in Python?",
            options: ["func", "def", "function", "lambda"],
            answer: "def",
          },
          {
            question: "What is the correct file extension for Python files?",
            options: [".py", ".pt", ".pyt", ".python"],
            answer: ".py",
          },
        ],
      },
      {
        id: 4,
        title: "Algorithms & Data Structures Quiz",
        questions: [
          {
            question: "Which data structure works on the principle of LIFO?",
            options: ["Queue", "Stack", "Tree", "Array"],
            answer: "Stack",
          },
          {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            answer: "O(log n)",
          },
        ],
      },
    ],
  },
  {
    subject: "Computer Science Basics",
    quizzes: [
      {
        id: 1,
        title: "Introduction to Computing Quiz",
        questions: [
          {
            question: "Who is known as the father of computers?",
            options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Bill Gates"],
            answer: "Charles Babbage",
          },
          {
            question: "What does CPU stand for?",
            options: [
              "Central Processing Unit",
              "Central Programming Unit",
              "Computer Processing Unit",
              "Core Processing Unit",
            ],
            answer: "Central Processing Unit",
          },
        ],
      },
      {
        id: 2,
        title: "Binary & Logic Quiz",
        questions: [
          {
            question: "What is the binary equivalent of the decimal number 10?",
            options: ["1010", "1001", "1110", "1100"],
            answer: "1010",
          },
          {
            question: "Which logic gate outputs true only if both inputs are true?",
            options: ["OR", "AND", "NOR", "XOR"],
            answer: "AND",
          },
        ],
      },
      {
        id: 3,
        title: "Hardware vs Software Quiz",
        questions: [
          {
            question: "Which of the following is an example of hardware?",
            options: ["Operating System", "RAM", "Browser", "Application"],
            answer: "RAM",
          },
          {
            question: "Software that manages computer hardware is called?",
            options: [
              "Application Software",
              "Operating System",
              "Utility Software",
              "Firmware",
            ],
            answer: "Operating System",
          },
        ],
      },
    ],
  },
  {
    subject: "Data Structures",
    quizzes: [
      {
        id: 1,
        title: "Arrays & Linked Lists Quiz",
        questions: [
          {
            question: "Which data structure stores elements in contiguous memory locations?",
            options: ["Array", "Linked List", "Tree", "Graph"],
            answer: "Array",
          },
          {
            question: "What is the time complexity of accessing an element by index in an array?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            answer: "O(1)",
          },
        ],
      },
      {
        id: 2,
        title: "Stacks & Queues Quiz",
        questions: [
          {
            question: "Which data structure works on the LIFO principle?",
            options: ["Queue", "Stack", "Tree", "Graph"],
            answer: "Stack",
          },
          {
            question: "What operation removes an element from the front of a queue?",
            options: ["Push", "Pop", "Dequeue", "Insert"],
            answer: "Dequeue",
          },
        ],
      },
      {
        id: 3,
        title: "Trees & Graphs Quiz",
        questions: [
          {
            question: "What is the topmost node of a tree called?",
            options: ["Leaf", "Root", "Parent", "Node"],
            answer: "Root",
          },
          {
            question: "Which traversal method visits all neighbors before moving deeper?",
            options: ["Depth-First Search", "Breadth-First Search", "Inorder", "Postorder"],
            answer: "Breadth-First Search",
          },
        ],
      },
    ],
  },
  {
    subject: "Geography",
    quizzes: [
      {
        id: 1,
        title: "World Capitals Quiz",
        questions: [
          {
            question: "What is the capital city of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            answer: "Canberra",
          },
          {
            question: "Which city is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            answer: "Ottawa",
          },
        ],
      },
      {
        id: 2,
        title: "Landforms & Climate Quiz",
        questions: [
          {
            question: "What type of landform is Mount Everest?",
            options: ["Plateau", "Hill", "Mountain", "Valley"],
            answer: "Mountain",
          },
          {
            question: "Which climate zone receives the most rainfall?",
            options: ["Tropical", "Arid", "Polar", "Temperate"],
            answer: "Tropical",
          },
        ],
      },
      {
        id: 3,
        title: "Continents & Oceans Quiz",
        questions: [
          {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            answer: "7",
          },
          {
            question: "Which is the largest ocean in the world?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: "Pacific",
          },
        ],
      },
    ],
  },
  {
    subject: "History",
    quizzes: [
      {
        id: 1,
        title: "Ancient Civilizations Quiz",
        questions: [
          {
            question: "Which ancient civilization built the pyramids?",
            options: ["Greek", "Egyptian", "Roman", "Mayan"],
            answer: "Egyptian",
          },
          {
            question: "The city of Rome was founded on which river?",
            options: ["Tiber", "Nile", "Danube", "Euphrates"],
            answer: "Tiber",
          },
        ],
      },
      {
        id: 2,
        title: "World Wars Quiz",
        questions: [
          {
            question: "In which year did World War II begin?",
            options: ["1935", "1937", "1939", "1941"],
            answer: "1939",
          },
          {
            question: "Who was the British Prime Minister during most of World War II?",
            options: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Harold Macmillan"],
            answer: "Winston Churchill",
          },
        ],
      },
      {
        id: 3,
        title: "Leaders & Revolutions Quiz",
        questions: [
          {
            question: "Who led the Indian independence movement through non-violence?",
            options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh"],
            answer: "Mahatma Gandhi",
          },
          {
            question: "The French Revolution began in which year?",
            options: ["1776", "1789", "1804", "1812"],
            answer: "1789",
          },
        ],
      },
    ],
  },
  {
    subject: "Physics",
    quizzes: [
      {
        id: 1,
        title: "Motion & Forces Quiz",
        questions: [
          {
            question: "What is the SI unit of force?",
            options: ["Newton", "Joule", "Watt", "Pascal"],
            answer: "Newton",
          },
          {
            question: "Which of Newton’s laws describes the relationship between force, mass, and acceleration?",
            options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
            answer: "Second Law",
          },
        ],
      },
      {
        id: 2,
        title: "Electricity & Magnetism Quiz",
        questions: [
          {
            question: "What particle is responsible for electric current in a wire?",
            options: ["Proton", "Neutron", "Electron", "Atom"],
            answer: "Electron",
          },
          {
            question: "What happens when a wire moves through a magnetic field?",
            options: [
              "Electric current is induced",
              "Magnetism is destroyed",
              "Heat is generated",
              "Light is produced",
            ],
            answer: "Electric current is induced",
          },
        ],
      },
      {
        id: 3,
        title: "Thermodynamics Quiz",
        questions: [
          {
            question: "What is the first law of thermodynamics about?",
            options: [
              "Energy conservation",
              "Entropy increase",
              "Heat transfer",
              "Pressure-volume relation",
            ],
            answer: "Energy conservation",
          },
          {
            question: "Which temperature scale has absolute zero as its starting point?",
            options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
            answer: "Kelvin",
          },
        ],
      },
    ],
  },
  {
    subject: "Programming",
    quizzes: [
      {
        id: 1,
        title: "JavaScript Fundamentals Quiz",
        questions: [
          {
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: ["int", "let", "var", "Both let and var"],
            answer: "Both let and var",
          },
          {
            question: "What does '===' operator check in JavaScript?",
            options: [
              "Only value equality",
              "Only type equality",
              "Value and type equality",
              "None of the above",
            ],
            answer: "Value and type equality",
          },
        ],
      },
      {
        id: 2,
        title: "Python Basics Quiz",
        questions: [
          {
            question: "Which of the following is used to define a function in Python?",
            options: ["func", "def", "lambda", "method"],
            answer: "def",
          },
          {
            question: "What is the correct file extension for Python files?",
            options: [".pt", ".pyth", ".py", ".pyt"],
            answer: ".py",
          },
        ],
      },
      {
        id: 3,
        title: "Debugging & Logic Quiz",
        questions: [
          {
            question: "What is a common method to find and fix errors in code?",
            options: ["Guessing", "Debugging", "Compiling", "Testing"],
            answer: "Debugging",
          },
          {
            question: "Which term refers to the flow of decision making in code?",
            options: ["Control structure", "Looping", "Condition", "Syntax"],
            answer: "Control structure",
          },
        ],
      },
    ],
  },
  {
    subject: "Programming Fundamentals",
    quizzes: [
      {
        id: 1,
        title: "Variables & Data Types Quiz",
        questions: [
          {
            question: "Which data type is used to store a sequence of characters?",
            options: ["int", "boolean", "string", "float"],
            answer: "string",
          },
          {
            question: "Which keyword declares a constant variable in JavaScript?",
            options: ["let", "const", "var", "define"],
            answer: "const",
          },
        ],
      },
      {
        id: 2,
        title: "Loops & Conditionals Quiz",
        questions: [
          {
            question: "Which loop runs at least once regardless of condition?",
            options: ["for", "while", "do...while", "none"],
            answer: "do...while",
          },
          {
            question: "Which keyword is used for conditional branching?",
            options: ["if", "loop", "case", "def"],
            answer: "if",
          },
        ],
      },
      {
        id: 3,
        title: "Functions & Scope Quiz",
        questions: [
          {
            question: "What is a function parameter?",
            options: [
              "A variable defined outside the function",
              "A value passed into a function",
              "The function’s return value",
              "A keyword in the function name",
            ],
            answer: "A value passed into a function",
          },
          {
            question: "Variables declared inside a function have what type of scope?",
            options: ["Global", "Local", "Block", "Universal"],
            answer: "Local",
          },
        ],
      },
    ],
  },
  {
    subject: "Science",
    quizzes: [
      {
        id: 1,
        title: "Scientific Method Quiz",
        questions: [
          {
            question: "What is the first step of the scientific method?",
            options: ["Experiment", "Observation", "Conclusion", "Hypothesis"],
            answer: "Observation",
          },
          {
            question: "What do scientists use to test a hypothesis?",
            options: ["Experiment", "Guess", "Theory", "Prediction"],
            answer: "Experiment",
          },
        ],
      },
      {
        id: 2,
        title: "Energy & Matter Quiz",
        questions: [
          {
            question: "What is the smallest unit of matter?",
            options: ["Atom", "Molecule", "Proton", "Electron"],
            answer: "Atom",
          },
          {
            question: "Energy cannot be created or destroyed according to which law?",
            options: [
              "Law of Motion",
              "Law of Conservation of Energy",
              "Law of Thermodynamics",
              "Law of Matter",
            ],
            answer: "Law of Conservation of Energy",
          },
        ],
      },
      {
        id: 3,
        title: "Earth & Space Science Quiz",
        questions: [
          {
            question: "What causes the Earth's seasons?",
            options: [
              "Earth’s rotation on its axis",
              "Earth’s tilt and revolution around the sun",
              "The moon’s gravity",
              "Solar flares",
            ],
            answer: "Earth’s tilt and revolution around the sun",
          },
          {
            question: "What is the name of our galaxy?",
            options: ["Andromeda", "Milky Way", "Orion", "Pegasus"],
            answer: "Milky Way",
          },
        ],
      },
    ],
  },
  {
    subject: "Technology",
    quizzes: [
      {
        id: 1,
        title: "Innovation & Invention Quiz",
        questions: [
          {
            question: "Which invention is credited with starting the Industrial Revolution?",
            options: ["Steam Engine", "Printing Press", "Telephone", "Light Bulb"],
            answer: "Steam Engine",
          },
          {
            question: "What is the primary goal of technological innovation?",
            options: [
              "Solve problems",
              "Create confusion",
              "Reduce education",
              "Increase myths",
            ],
            answer: "Solve problems",
          },
        ],
      },
      {
        id: 2,
        title: "AI & Robotics Quiz",
        questions: [
          {
            question: "What does AI stand for?",
            options: ["Automatic Integration", "Artificial Intelligence", "Advanced Internet", "Applied Innovation"],
            answer: "Artificial Intelligence",
          },
          {
            question: "Robots are typically controlled by:",
            options: ["Humans only", "AI programs", "Gravity", "Magnetism"],
            answer: "AI programs",
          },
        ],
      },
      {
        id: 3,
        title: "Internet & Cybersecurity Quiz",
        questions: [
          {
            question: "What is phishing?",
            options: [
              "Fishing in a river",
              "A cyber-attack attempting to steal sensitive information",
              "Installing antivirus software",
              "Encrypting data",
            ],
            answer: "A cyber-attack attempting to steal sensitive information",
          },
          {
            question: "Which of these is a strong password?",
            options: [
              "123456",
              "password",
              "G7#fP!9zL2",
              "abcdef",
            ],
            answer: "G7#fP!9zL2",
          },
        ],
      },
    ],
  },
];

export function getAllQuiz() {
  return quizBySubject;
}

export function getQuizBySubject(subject) {
  // Filter all entries matching the subject
  const matchedSubjects = quizBySubject.filter((quiz) => quiz.subject === subject);
  if (matchedSubjects.length === 0) return [];

  // Flatten all quizzes and map to id & title
  const quizzes = matchedSubjects.flatMap((sub) =>
    sub.quizzes.map(({ id, title }) => ({ id, title }))
  );

  return quizzes;
}

export function getQuizBySubjectAndTitle(subjectId, quizTitle) {
  // Find subject by ID or name
  const subject = quizBySubject.find(
    (item) => item.subject.toLowerCase() === subjectId.toLowerCase()
  );

  if (!subject) return null;

  // Find quiz by title inside that subject
  const quiz = subject.quizzes.find(
    (q) => q.title.toLowerCase() === decodeURIComponent(quizTitle).toLowerCase()
  );

  return quiz || null;
}

