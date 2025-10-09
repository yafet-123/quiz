import { MainHeader } from "../../../components/common/MainHeader";
import { getAllSubjects, getSubjectById } from "../../../data/SubjectData.jsx";
import Subject from "../../../components/practice/Subject";
import QuizPage from '../../../components/practice/QuizPage.jsx';

export default function BookGradeDetail({subjectId}) {
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`MatricMate`} />
      <QuizPage gradeId={subjectId} />
    </div>
  );
}
 
export const getServerSideProps = async (context) => {
  const subjectId = context.params.subjectId;
  console.log(subjectId)
  return {
    props: { subjectId: subjectId },
  };
};