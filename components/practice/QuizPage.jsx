
import React, { useState } from "react";

const quizData = {
  grade9: {
    biology: [
      {
        question: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
        answer: 1,
      },
      {
        question: "Which part of the plant is responsible for photosynthesis?",
        options: ["Root", "Stem", "Leaf", "Flower"],
        answer: 2,
      },
      {
        question: "What is the basic unit of life?",
        options: ["Tissue", "Organ", "Cell", "System"],
        answer: 2,
      },
      {
        question: "Which blood cells fight infections?",
        options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
        answer: 1,
      },
      {
        question: "Where does digestion begin in the human body?",
        options: ["Stomach", "Small intestine", "Mouth", "Esophagus"],
        answer: 2,
      },
    ],
    chemistry: [
      {
        question: "What is the chemical symbol for Oxygen?",
        options: ["O", "Ox", "Og", "On"],
        answer: 0,
      },
      {
        question: "Which gas is essential for combustion?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: 0,
      },
      {
        question: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "1"],
        answer: 1,
      },
      {
        question: "What is H2O commonly known as?",
        options: ["Oxygen", "Hydrogen", "Water", "Salt"],
        answer: 2,
      },
      {
        question: "Which metal is liquid at room temperature?",
        options: ["Mercury", "Iron", "Aluminum", "Copper"],
        answer: 0,
      },
    ],
    physics: [
      {
        question: "Which of the following is a unit of force?",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        answer: 2,
      },
      {
        question: "What is the speed of light in vacuum?",
        options: ["3 × 10^8 m/s", "1.5 × 10^8 m/s", "3 × 10^6 m/s", "9.8 m/s²"],
        answer: 0,
      },
      {
        question: "What is the acceleration due to gravity on Earth?",
        options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "12 m/s²"],
        answer: 1,
      },
      {
        question: "What type of energy is possessed by a moving object?",
        options: ["Potential energy", "Kinetic energy", "Thermal energy", "Nuclear energy"],
        answer: 1,
      },
      {
        question: "Which device is used to measure electric current?",
        options: ["Voltmeter", "Ammeter", "Barometer", "Thermometer"],
        answer: 1,
      },
    ],
    // same format for English, Math, History, Geography, Citizenship
  },
  grade10: {
    biology: [
      {
        question: "Which organ pumps blood in the human body?",
        options: ["Lungs", "Brain", "Heart", "Kidney"],
        answer: 2,
      },
      {
        question: "What is the process of cell division in body cells called?",
        options: ["Meiosis", "Mitosis", "Fertilization", "Fusion"],
        answer: 1,
      },
      {
        question: "Which blood group is the universal donor?",
        options: ["A", "B", "AB", "O"],
        answer: 3,
      },
    ],
    chemistry: [
      {
        question: "What is the chemical symbol of Iron?",
        options: ["Ir", "In", "Fe", "I"],
        answer: 2,
      },
      {
        question: "Which element has the atomic number 1?",
        options: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
        answer: 1,
      },
      {
        question: "Which type of bond involves sharing of electrons?",
        options: ["Ionic", "Covalent", "Metallic", "Hydrogen"],
        answer: 1,
      },
    ],
    physics: [
      {
        question: "What is the SI unit of power?",
        options: ["Joule", "Newton", "Watt", "Ampere"],
        answer: 2,
      },
      {
        question: "Which energy source is renewable?",
        options: ["Coal", "Petroleum", "Wind", "Natural gas"],
        answer: 2,
      },
      {
        question: "What type of lens is used in magnifying glasses?",
        options: ["Concave", "Convex", "Plane", "Cylindrical"],
        answer: 1,
      },
    ],
    english: [
      {
        question: "Choose the correct sentence:",
        options: [
          "She go to school daily.",
          "She goes to school daily.",
          "She going to school daily.",
          "She gone to school daily.",
        ],
        answer: 1,
      },
      {
        question: "What is the antonym of 'strong'?",
        options: ["Weak", "Powerful", "Mighty", "Tough"],
        answer: 0,
      },
      {
        question: "Identify the verb in: 'The cat sleeps on the sofa.'",
        options: ["Cat", "Sleeps", "Sofa", "The"],
        answer: 1,
      },
    ],
    math: [
      {
        question: "Solve: 12 ÷ 3 + 4",
        options: ["8", "6", "7", "9"],
        answer: 3,
      },
      {
        question: "Find the value of 2² + 3²",
        options: ["9", "10", "12", "13"],
        answer: 3,
      },
      {
        question: "Simplify: (x + 2)(x - 2)",
        options: ["x² - 4", "x² + 4", "x² + 2x - 2", "x² - 2x + 2"],
        answer: 0,
      },
    ],
    history: [
      {
        question: "Who was Ethiopia’s last emperor?",
        options: ["Tewodros II", "Haile Selassie", "Menelik II", "Yohannes IV"],
        answer: 1,
      },
      {
        question: "In which year did Italy first invade Ethiopia?",
        options: ["1889", "1896", "1935", "1941"],
        answer: 2,
      },
      {
        question: "Which empire built the castles in Gondar?",
        options: ["Axumite", "Zagwe", "Solomonic", "Gondarine"],
        answer: 3,
      },
    ],
    geography: [
      {
        question: "Which line divides the Earth into Northern and Southern hemispheres?",
        options: ["Equator", "Prime Meridian", "Tropic of Cancer", "Arctic Circle"],
        answer: 0,
      },
      {
        question: "Which is the largest desert in the world?",
        options: ["Sahara", "Kalahari", "Gobi", "Arabian"],
        answer: 0,
      },
      {
        question: "Which country is called the 'Horn of Africa'?",
        options: ["Ethiopia", "Somalia", "Kenya", "Djibouti"],
        answer: 1,
      },
    ],
    citizenship: [
      {
        question: "Which branch of government makes laws?",
        options: ["Executive", "Legislative", "Judiciary", "Military"],
        answer: 1,
      },
      {
        question: "What is the supreme law of Ethiopia?",
        options: ["The Bible", "The Constitution", "The Parliament", "The Courts"],
        answer: 1,
      },
      {
        question: "Which quality is essential for good citizenship?",
        options: ["Obedience", "Responsibility", "Participation", "All of the above"],
        answer: 3,
      },
    ],
  },
  grade11: {
    biology: [
      {
        question: "What is the basic unit of life?",
        options: ["Atom", "Molecule", "Cell", "Organ"],
        answer: 2,
      },
      {
        question: "Which organelle is responsible for photosynthesis?",
        options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
        answer: 1,
      },
      {
        question: "What type of reproduction involves only one parent?",
        options: ["Sexual", "Asexual", "Fertilization", "Pollination"],
        answer: 1,
      },
    ],
    chemistry: [
      {
        question: "Which gas is released during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: 0,
      },
      {
        question: "What is the pH of pure water?",
        options: ["7", "0", "14", "1"],
        answer: 0,
      },
      {
        question: "Which element is most abundant in the Earth’s crust?",
        options: ["Oxygen", "Iron", "Silicon", "Aluminium"],
        answer: 0,
      },
    ],
    physics: [
      {
        question: "What is the formula for speed?",
        options: ["s = v × t", "v = s / t", "a = v / t", "F = m × a"],
        answer: 1,
      },
      {
        question: "Which of these is a scalar quantity?",
        options: ["Velocity", "Acceleration", "Speed", "Force"],
        answer: 2,
      },
      {
        question: "What is the acceleration due to gravity on Earth?",
        options: ["9.8 m/s²", "10 m/s²", "9.8 km/s²", "8 m/s²"],
        answer: 0,
      },
    ],
    english: [
      {
        question: "Choose the correct past tense form: 'She ___ to the market yesterday.'",
        options: ["go", "gone", "went", "going"],
        answer: 2,
      },
      {
        question: "Select the synonym of 'happy'.",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        answer: 1,
      },
      {
        question: "Identify the adjective: 'The quick brown fox jumps over the lazy dog.'",
        options: ["Fox", "Jumps", "Quick", "Dog"],
        answer: 2,
      },
    ],
    math: [
      {
        question: "Solve: 3x + 5 = 20",
        options: ["x = 5", "x = 10", "x = 15", "x = 8"],
        answer: 0,
      },
      {
        question: "What is the value of log₁₀ 1000?",
        options: ["2", "3", "4", "10"],
        answer: 1,
      },
      {
        question: "Simplify: 2(x + 3) + 4",
        options: ["2x + 10", "2x + 6", "2x + 4", "x + 7"],
        answer: 0,
      },
    ],
    history: [
      {
        question: "Who was the first emperor of Ethiopia?",
        options: ["Menelik II", "Haile Selassie", "Yekuno Amlak", "Tewodros II"],
        answer: 2,
      },
      {
        question: "In which year did Ethiopia resist Italian invasion successfully at Adwa?",
        options: ["1896", "1935", "1890", "1900"],
        answer: 0,
      },
      {
        question: "Which dynasty ruled Ethiopia before the 20th century?",
        options: ["Zagwe", "Solomonic", "Axumite", "Oromo"],
        answer: 1,
      },
    ],
    geography: [
      {
        question: "Which continent is the Sahara Desert located in?",
        options: ["Asia", "Africa", "Australia", "South America"],
        answer: 1,
      },
      {
        question: "Which river is the longest in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: 1,
      },
      {
        question: "Which ocean is the largest by area?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3,
      },
    ],
    citizenship: [
      {
        question: "Which branch of government interprets laws?",
        options: ["Legislative", "Executive", "Judiciary", "Military"],
        answer: 2,
      },
      {
        question: "Which of the following is a civic duty?",
        options: ["Voting", "Obeying laws", "Paying taxes", "All of the above"],
        answer: 3,
      },
      {
        question: "What is the national flag a symbol of?",
        options: ["Unity", "Sovereignty", "Identity", "All of the above"],
        answer: 3,
      },
    ],
  },
  grade12: {
    biology: [
      {
        question: "What is the process by which plants lose water through leaves?",
        options: ["Transpiration", "Photosynthesis", "Respiration", "Osmosis"],
        answer: 0,
      },
      {
        question: "Which blood cells help fight infections?",
        options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
        answer: 1,
      },
      {
        question: "DNA is made up of units called?",
        options: ["Nucleotides", "Amino acids", "Proteins", "Lipids"],
        answer: 0,
      },
    ],
    chemistry: [
      {
        question: "Which gas is produced when an acid reacts with a metal?",
        options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
        answer: 1,
      },
      {
        question: "What is the molar mass of water (H2O)?",
        options: ["18 g/mol", "20 g/mol", "16 g/mol", "22 g/mol"],
        answer: 0,
      },
      {
        question: "Which element is most reactive in the halogen group?",
        options: ["Fluorine", "Chlorine", "Bromine", "Iodine"],
        answer: 0,
      },
    ],
    physics: [
      {
        question: "What is the SI unit of energy?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        answer: 1,
      },
      {
        question: "The slope of a velocity-time graph gives?",
        options: ["Displacement", "Speed", "Acceleration", "Force"],
        answer: 2,
      },
      {
        question: "Which phenomenon explains the bending of light as it passes from one medium to another?",
        options: ["Reflection", "Refraction", "Diffraction", "Interference"],
        answer: 1,
      },
    ],
    english: [
      {
        question: "Identify the correct sentence:",
        options: [
          "He don't like apples.",
          "He doesn't likes apples.",
          "He doesn't like apples.",
          "He not like apples.",
        ],
        answer: 2,
      },
      {
        question: "Choose the antonym of 'abundant'.",
        options: ["Plentiful", "Scarce", "Many", "Numerous"],
        answer: 1,
      },
      {
        question: "Select the adverb in the sentence: 'She sings beautifully.'",
        options: ["She", "Sings", "Beautifully", "None"],
        answer: 2,
      },
    ],
    math: [
      {
        question: "Solve: 2x² - 8 = 0",
        options: ["x = ±2", "x = ±4", "x = ±1", "x = ±3"],
        answer: 0,
      },
      {
        question: "Derivative of x² is?",
        options: ["x", "2x", "x²", "2"],
        answer: 1,
      },
      {
        question: "Integral of 2x dx is?",
        options: ["x² + C", "2x + C", "x + C", "x²/2 + C"],
        answer: 0,
      },
    ],
    history: [
      {
        question: "Which emperor of Ethiopia modernized the country in the early 20th century?",
        options: ["Menelik II", "Haile Selassie", "Tewodros II", "Yekuno Amlak"],
        answer: 1,
      },
      {
        question: "The Derg regime in Ethiopia started in which year?",
        options: ["1974", "1975", "1980", "1960"],
        answer: 0,
      },
      {
        question: "Who led the Battle of Adwa against Italy?",
        options: ["Menelik II", "Haile Selassie", "Tewodros II", "Yekuno Amlak"],
        answer: 0,
      },
    ],
    geography: [
      {
        question: "Which is the highest mountain in Africa?",
        options: ["Mount Kenya", "Mount Kilimanjaro", "Atlas Mountains", "Simien Mountains"],
        answer: 1,
      },
      {
        question: "Which country has the largest population in Africa?",
        options: ["Nigeria", "Ethiopia", "Egypt", "South Africa"],
        answer: 0,
      },
      {
        question: "The Great Rift Valley passes through which country?",
        options: ["Ethiopia", "Kenya", "Tanzania", "All of the above"],
        answer: 3,
      },
    ],
    citizenship: [
      {
        question: "What is the main responsibility of a citizen in a democratic country?",
        options: ["Obey laws", "Vote", "Pay taxes", "All of the above"],
        answer: 3,
      },
      {
        question: "Which is a fundamental right in a democratic society?",
        options: ["Freedom of speech", "Right to education", "Right to vote", "All of the above"],
        answer: 3,
      },
      {
        question: "Which institution interprets the constitution?",
        options: ["Executive", "Legislature", "Judiciary", "Military"],
        answer: 2,
      },
    ],
  },

};

export default function QuizPage() {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions =
    grade && subject ? quizData[grade][subject] || [] : [];

  const handleAnswer = (i) => {
    if (i === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Makeda Tour Quiz</h1>

      {/* Select Grade */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Grade:</label>
        <select
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value);
            setSubject("");
            setCurrentQ(0);
            setShowResult(false);
            setScore(0);
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Choose Grade --</option>
          <option value="grade9">Grade 9</option>
          <option value="grade10">Grade 10</option>
          <option value="grade11">Grade 11</option>
          <option value="grade12">Grade 12</option>
        </select>
      </div>

      {/* Select Subject */}
      {grade && (
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Subject:</label>
          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setCurrentQ(0);
              setShowResult(false);
              setScore(0);
            }}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Choose Subject --</option>
            {Object.keys(quizData[grade]).map((sub) => (
              <option key={sub} value={sub}>
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quiz Section */}
      {subject && questions.length > 0 && !showResult && (
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Q{currentQ + 1}: {questions[currentQ].question}
          </h2>

          <div className="flex flex-col gap-2">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="p-2 border rounded hover:bg-green-100"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-green-700">Quiz Completed!</h2>
          <p className="mt-2">
            You scored <b>{score}</b> out of <b>{questions.length}</b>.
          </p>
          <button
            onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setShowResult(false);
            }}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
