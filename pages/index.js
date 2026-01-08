import { MainHeader } from '../components/common/MainHeader';
import React from 'react'
import Link from "next/link"
import {
  FaBookOpen,
  FaGraduationCap,
  FaChartLine,
  FaArrowRight,
  FaFileAlt,
  FaListUl,
  FaYoutube,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaEnvelopeOpenText,
  FaStickyNote,
  FaBookReader,
  FaTasks
} from "react-icons/fa";
import {
  RiFunctionLine
} from "react-icons/ri"
import { IoIosFlash } from "react-icons/io";

import {
  MdAssignment
} from "react-icons/md"

export default function Home() {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Home Page" />
      <div className="font-sans text-gray-800">
        {/* Hero Section */}
        <section className="bg-purple-50 py-40 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#417094] mb-4">
            Your Mission. Our Goal.
          </h2>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Trusted by thousands of students to ace their GCSEs, IGCSEs, A Levels,
            and more.
          </p> */}

          <Link href="/study">
            <button className="bg-[#417094] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#fff] hover:text-[#417094] transition">
              Get Started
            </button>
          </Link>
        </section>

        {/* Online Platform Features */}
        <section className="py-20 bg-white px-6">
          <h3 className="text-3xl font-bold text-center text-[#417094] mb-10">
            All in One Online Learning Platform
          </h3>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Learn, practice, and test yourself with powerful study tools designed
            to help you understand faster and remember longer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
            <FeatureCard
              icon={<FaFileAlt />}          // More relevant for notes
              title="Exam Preparation"
              description="Well-structured notes covering each topic in detail to support thorough understanding."
              href="/study/exampreparation"
            />
            <FeatureCard
              icon={<FaBook />}          // More relevant for notes
              title="Book"
              description="Well-structured notes covering each topic in detail to support thorough understanding."
              href="/study/book"
            />
                
            <FeatureCard
              icon={<FaBookReader />}          // More relevant for notes
              title="Past Papers"
              description="Well-structured notes covering each topic in detail to support thorough understanding."
              href="/study/past-paper"
            />
            <FeatureCard
              icon={<FaTasks />}               // Represents practice & tasks
              title="Practice Questions"
              description="Strengthen your knowledge with topic-based practice questions and guided solutions."
              href="/study/practice-quizzes"
            />
            <FeatureCard
              icon={<FaStickyNote />}          // Represents revision summaries
              title="Revision Notes"
              description="Quick, easy-to-read revision summaries designed to help you review concepts fast."
              href="/study/revision-note"
            />
            <FeatureCard
              icon={<IoIosFlash />}       // Perfect for flashcards
              title="Flashcard Tips"
              description="Boost your memory using digital flashcards that highlight key concepts and facts."
              href="/study/flashcards-tips"
            />
            <FeatureCard
              icon={<MdAssignment />}          // Represents worksheets clearly
              title="Worksheets / Topical questions"
              description="Downloadable worksheets filled with exercises to apply what you’ve learned."
              href="/study/worksheet"
            />
            <FeatureCard
              icon={<RiFunctionLine />}        // Perfect icon for formulas
              title="Formula Sheet"
              description="A compact sheet featuring essential formulas and equations for quick reference."
              href="/study/formulaSheet"
            />
            <FeatureCard
              icon={<FaListUl />}              // Better icon for definitions list
              title="Definition Sheet"
              description="A neatly organized list of important terms and their simplified definitions."
              href="/study/definitionSheet"
            />
           <FeatureCard
              icon={<FaYoutube />}              // Better icon for definitions list
              title="Youtube"
              description="A neatly organized list of important terms and their simplified definitions."
              href="/study/youtube"
            />
          </div>

        </section>

        {/* How It Works */}
        {/* <section className="bg-purple-50 py-20 px-6">
          <h3 className="text-3xl font-bold text-center text-[#417094] mb-10">
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
        </section> */}

        {/* Why Students Love Us */}
        {/* <section className="bg-white py-20 px-6">
          <h3 className="text-3xl font-bold text-center text-[#417094] mb-10">
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
        </section> */}

        {/* Join Section */}
        <section className="bg-purple-100 py-20 px-6">
          <h3 className="text-3xl font-bold text-center text-[#417094] mb-12">
            Join Our Community
          </h3>
          <div className="grid grid-cols-1 gap-10 text-center">
            <JoinCard
              icon={<FaUserGraduate />}
              title="Students"
              description="Get instant access to quizzes, notes, and progress tracking tools to help you study smarter."
              buttonText="Join as Student"
              href="https://t.me/+8ymQzNdhkTExM2E0"
            />
            {/* <JoinCard
              icon={<FaChalkboardTeacher />}
              title="Teachers"
              description="Upload resources, create study materials, and help students achieve exam success."
              buttonText="Join as Teacher"
            /> */}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-20 px-6">
          <h3 className="text-3xl font-bold text-center text-[#417094] mb-10">
            What Students Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <TestimonialCard
              name="Sarah J."
              text="Aceit made revision so much easier! The quizzes and notes helped me go from a C to an A."
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
        <section className="py-20 bg-[#faf5ff] text-center text-[#417094] px-6">
          <FaEnvelopeOpenText className="text-5xl mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg mb-8 max-w-xl mx-auto text-black">
            Get free tips, study resources, and updates straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg w-full sm:w-2/3 text-black"
            />
            <button className="bg-[#417094] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#fff] hover:text-[#417094]">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
}

/* --- Reusable Components --- */
function FeatureCard({ icon, title, description, href }) {
  return (
    <Link 
      href={href}
      className="border rounded-xl shadow-sm hover:shadow-lg p-8 transition hover:scale-105 flex flex-col justify-center items-center"
    >
      <div className="text-[#417094] text-5xl mx-auto mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      {/* <p className="text-gray-600">{description}</p> */}
    </Link>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-[#417094] text-5xl font-bold mb-4">{number}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ReasonCard({ icon, title, text }) {
  return (
    <div className="p-4 flex flex-col justify-center items-center bg-[#f3e8ff]">
      <div className="text-5xl text-[#417094] mx-auto mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function JoinCard({ icon, title, description, buttonText, href }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition flex flex-col justify-center items-center">
      <div className="text-5xl text-[#417094] mx-auto mb-4">{icon}</div>
      <h4 className="text-2xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link 
        href={href}
        className="bg-[#417094] text-white px-6 py-3 rounded-lg hover:bg-[#fff] hover:text-[#417094] transition"
      >
        {buttonText}
      </Link>
    </div>
  );
}

function TestimonialCard({ name, text }) {
  return (
    <div className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
      <p className="italic text-gray-700 mb-4">“{text}”</p>
      <h4 className="font-semibold text-[#417094]">{name}</h4>
    </div>
  );
}
