const SubjectSummaryArray = [
  {
    id: "Grade 1",
    name: "Grade 1",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "የክወናና የዕይታ ጥበባት"]
  },
  {
    id: "Grade 2",
    name: "Grade 2",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "የክወናና የዕይታ ጥበባት"]
  },
  {
    id: "Grade 3",
    name: "Grade 3",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "የክወናና የዕይታ ጥበባት"]
  },
  {
    id: "Grade 4",
    name: "Grade 4",
   	subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "የክወናና የዕይታ ጥበባት"]
  },
  {
    id: "Grade 5",
    name: "Grade 5",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "የክወናና የዕይታ ጥበባት"]
  },
  {
    id: "Grade 6",
    name: "Grade 6",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "የክወናና የዕይታ ጥበባት"]
  },
  {
    id: "Grade 7",
    name: "Grade 7",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "Career And Technical Education CTE", "CitizenShip", "Information Technology ICT", "Scoial Study", "Physical Education"]
  },
  {
    id: "Grade 8",
    name: "Grade 8",
    subjects: ["Amharic", "English", "Mathematics", "Environmental Science", "Career And Technical Education CTE", "CitizenShip", "Information Technology ICT", "Scoial Study", "Physical Education"]
  },
  {
    id: "Grade 9",
    name: "Grade 9",
    subjects: ["Amharic", "English", "Mathematics", "Biology", "Chemistry", "Physics" , "History", "Geography", "Economics", "CitizenShip", "Information Technology ICT", "Oroimiya", "Physical Education"]
  },
  {
    id: "Grade 10",
    name: "Grade 10",
    subjects: ["Amharic", "English", "Mathematics", "Biology", "Chemistry", "Physics" , "History", "Geography", "Economics", "CitizenShip", "Information Technology ICT", "Oroimiya", "Physical Education"]
  },
  {
    id: "Grade 11 Social",
    name: "Grade 11 Social",
    subjects: ["English", "Mathematics", "Geography", "History", "Economics", "ICT", "SAT"]
  },
  {
    id: "Grade 11 Natural",
    name: "Grade 11 Natural",
    subjects: ["English", "Mathematics", "Biology", "Chemistry", "Physics", "Web Development", "ICT"]
  },
  {
    id: "Grade 12 Social",
    name: "Grade 12 Social",
    subjects: ["English", "Mathematics", "Geography", "History", "Economics", "ICT", "SAT"]
  },
  {
    id: "Grade 12 Natural",
    name: "Grade 12 Natural",
    subjects: ["English", "Mathematics", "Biology", "Chemistry", "Physics", "Web Development", "ICT"]
  }
]

export function getFeaturedSubjects() {
  return SubjectSummaryArray.filter((subject) => subject.isFeatured);
}

export function getAllSubjects() {
  return SubjectSummaryArray;
}

export function getSubjectById(id) {
  return SubjectSummaryArray.filter((subject) => subject.id === id);
}