// pages/index-replica.js
import {
  FaBookOpen,
  FaGraduationCap,
  FaChartLine,
  FaArrowRight,
  FaClipboardList,
  FaFileAlt,
  FaLaptopCode,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaEnvelopeOpenText,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-purple-50 py-40 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Study Smarter. Not Harder.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Trusted by thousands of students to ace their GCSEs, IGCSEs, A Levels,
          and more.
        </p>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
          Get Started
        </button>
      </section>

      {/* Online Platform Features */}
      <section className="py-20 bg-white px-6">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-10">
          All in One Online Learning Platform
        </h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Learn, practice, and test yourself with powerful study tools designed
          to help you understand faster and remember longer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          <FeatureCard
            icon={<FaFileAlt />}
            title="Worksheets"
            description="Download printable worksheets for every topic and practice anywhere, anytime."
          />
          <FeatureCard
            icon={<FaClipboardList />}
            title="Quizzes"
            description="Test your understanding with interactive quizzes and get instant feedback."
          />
          <FeatureCard
            icon={<FaBookOpen />}
            title="Study Notes"
            description="Access concise and easy-to-follow revision notes written by expert teachers."
          />
          <FeatureCard
            icon={<FaLaptopCode />}
            title="Online Practice"
            description="Learn digitally with our interactive online lessons and question banks."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-purple-50 py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-10">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <StepCard
            number="1"
            title="Learn"
            description="Start with easy-to-understand lessons and notes written by qualified teachers."
          />
          <StepCard
            number="2"
            title="Practice"
            description="Test your skills using quizzes, past papers, and worksheets."
          />
          <StepCard
            number="3"
            title="Succeed"
            description="Track your progress and get ready to ace your exams with confidence."
          />
        </div>
      </section>

      {/* Why Students Love Us */}
      <section className="bg-white py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-10">
          Why Students Love Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ReasonCard
            icon={<FaGraduationCap />}
            title="Expert Resources"
            text="Exam-style questions, mark schemes, and teacher-written materials designed to boost performance."
          />
          <ReasonCard
            icon={<FaChartLine />}
            title="Track Progress"
            text="See how you’re improving with progress tracking and topic insights."
          />
          <ReasonCard
            icon={<FaArrowRight />}
            title="Exam Success"
            text="Gain confidence, master topics, and achieve your academic goals."
          />
        </div>
      </section>

      {/* Join Section */}
      <section className="bg-purple-100 py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-12">
          Join Our Community
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
          <JoinCard
            icon={<FaUserGraduate />}
            title="Students"
            description="Get instant access to quizzes, notes, and progress tracking tools to help you study smarter."
            buttonText="Join as Student"
          />
          <JoinCard
            icon={<FaChalkboardTeacher />}
            title="Teachers"
            description="Upload resources, create study materials, and help students achieve exam success."
            buttonText="Join as Teacher"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-10">
          What Students Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <TestimonialCard
            name="Sarah J."
            text="Save My Exams made revision so much easier! The quizzes and notes helped me go from a C to an A."
          />
          <TestimonialCard
            name="Ethan R."
            text="I love the progress tracking. It keeps me motivated and focused on what I need to improve."
          />
          <TestimonialCard
            name="Maya K."
            text="Best platform for A-level prep. The worksheets are super helpful for understanding tricky topics!"
          />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#faf5ff] text-center text-white px-6">
        <FaEnvelopeOpenText className="text-5xl mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
        <p className="text-lg mb-8 max-w-xl mx-auto text-purple-100">
          Get free tips, study resources, and updates straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-full sm:w-2/3 text-gray-800"
          />
          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg hover:bg-purple-100">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

/* --- Reusable Components --- */
function FeatureCard({ icon, title, description }) {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-lg p-8 transition hover:scale-105 flex justify-center items-center">
      <div className="text-purple-600 text-5xl mx-auto mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-purple-600 text-5xl font-bold mb-4">{number}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ReasonCard({ icon, title, text }) {
  return (
    <div className="p-4 flex justify-center items-center bg-[#f3e8ff]">
      <div className="text-5xl text-purple-600 mx-auto mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function JoinCard({ icon, title, description, buttonText }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition flex justify-center items-center">
      <div className="text-5xl text-purple-600 mx-auto mb-4">{icon}</div>
      <h4 className="text-2xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
        {buttonText}
      </button>
    </div>
  );
}

function TestimonialCard({ name, text }) {
  return (
    <div className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
      <p className="italic text-gray-700 mb-4">“{text}”</p>
      <h4 className="font-semibold text-purple-700">{name}</h4>
    </div>
  );
}
