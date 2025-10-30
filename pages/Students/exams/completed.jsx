export default function ExamCompleted() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Exam Already Submitted</h1>
        <p className="text-gray-700">
          You have already completed this exam. You cannot attempt it again.
        </p>
      </div>
    </div>
  );
}
