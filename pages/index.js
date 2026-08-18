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
import { MdAssignment } from "react-icons/md";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import HeroSkeleton from '../components/home/HeroSkeleton';
import FallbackIllustration from '../components/home/FallbackIllustration';

const Hero3DCanvas = dynamic(() => import('../components/home/Hero3DCanvas'), {
  ssr: false,
  loading: () => <HeroSkeleton />
});

export default function Home() {
  const [hasWebGL, setHasWebGL] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  return (
    <React.Fragment>
      <MainHeader title="Aceit : Home Page" />
      <div className="font-sans text-gray-800">
        {/* Hero Section */}
        <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight animate-fadeDown">
                Your Mission.<br /><span className="text-gradient">Our Goal.</span>
              </h2>
              
              <Reveal delay={120}>
              <p className="text-lg text-ink-500 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed animate-fadeUp">
                Learn, practice, and test yourself with our comprehensive, high-quality study materials designed to help you ace your exams.
              </p>
              </Reveal>
              
              <div className="w-full flex justify-center lg:justify-start animate-[fadeInUp_1.2s_ease-out]">
                <Link href="/study" passHref legacyBehavior>
                  <motion.a
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(0, 209, 187, 0.55)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 15 }}
                    className="btn-primary text-lg max-w-xs"
                  >
                    Get Started
                    <motion.span
                      animate={{ x: isHovered ? 6 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center"
                    >
                      <FaArrowRight />
                    </motion.span>
                  </motion.a>
                </Link>
              </div>
            </div>

            {/* Right 3D Scene / Fallback Column */}
            <div className="lg:col-span-5 w-full flex items-center justify-center animate-[fadeInUp_1s_ease-out]">
              <div className="w-full max-w-md lg:max-w-none">
                {hasWebGL ? (
                  <Hero3DCanvas />
                ) : (
                  <FallbackIllustration />
                )}
              </div>
            </div>
          </div>
          
          <style jsx global>{`
            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </section>

        {/* Online Platform Features */}
        <section className="py-20 px-5">
          <Reveal variant="up" className="text-center mb-12">
            <span className="section-eyebrow">Study Tools</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              All in One <span className="text-gradient">Online Learning Platform</span>
            </h3>
            <p className="section-subtitle max-w-2xl mx-auto mt-4">
              Learn, practice, and test yourself with powerful study tools designed
              to help you understand faster and remember longer.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center max-w-7xl mx-auto">
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
        <section className="py-20 px-6">
          <Reveal className="text-center mb-12">
            <span className="section-eyebrow">Community</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">Join Our Community</h3>
          </Reveal>
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
        <section className="py-20 px-6">
          <Reveal className="text-center mb-10">
            <span className="section-eyebrow">Testimonials</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">What Students Say</h3>
          </Reveal>
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
        <section className="py-20 px-6">
          <Reveal>
            <div className="glass-card max-w-3xl mx-auto p-10 text-center">
              <FaEnvelopeOpenText className="text-5xl mx-auto mb-4 text-primary-500" />
              <h3 className="section-title text-3xl mb-3">Stay Updated</h3>
              <p className="text-ink-500 text-lg mb-8 max-w-xl mx-auto">
                Get free tips, study resources, and updates straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-fancy flex-1 sm:w-2/3"
                />
                <button type="submit" className="btn-primary sm:w-auto">Subscribe</button>
              </form>
            </div>
          </Reveal>
        </section>
      </div>
    </React.Fragment>
  );
}

/* --- Reusable Components --- */
function FeatureCard({ icon, title, description, href }) {
  return (
    <Reveal className="h-full">
      <Link
        href={href}
        className="glass-card group block p-7 h-full flex flex-col justify-center items-center gap-4"
      >
        <span className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:from-primary-500 group-hover:to-ocean-500 group-hover:text-white shadow-soft ring-1 ring-white">
          {icon}
        </span>
        <h4 className="text-lg font-bold text-ink-800 group-hover:text-primary-700 transition-colors">{title}</h4>
      </Link>
    </Reveal>
  );
}

function StepCard({ number, title, description }) {
  return (
    <Reveal className="h-full">
      <div className="glass-card h-full p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-2xl font-bold shadow-soft">
          {number}
        </div>
        <h4 className="text-xl font-bold mb-2 text-ink-800">{title}</h4>
        <p className="text-ink-500">{description}</p>
      </div>
    </Reveal>
  );
}

function ReasonCard({ icon, title, text }) {
  return (
    <Reveal className="h-full">
      <div className="glass-card h-full p-8 flex flex-col justify-center items-center text-center">
        <div className="text-4xl text-ocean-600 mb-4">{icon}</div>
        <h4 className="text-xl font-bold mb-2 text-ink-800">{title}</h4>
        <p className="text-ink-500">{text}</p>
      </div>
    </Reveal>
  );
}

function JoinCard({ icon, title, description, buttonText, href }) {
  return (
    <Reveal>
      <div className="glass-card p-8 flex flex-col justify-center items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-4xl shadow-soft">
          {icon}
        </div>
        <h4 className="text-2xl font-bold mb-3 text-ink-800">{title}</h4>
        <p className="text-ink-500 mb-6">{description}</p>
        <Link href={href} className="btn-primary">
          {buttonText}
        </Link>
      </div>
    </Reveal>
  );
}

function TestimonialCard({ name, text }) {
  return (
    <Reveal>
      <div className="glass-card p-6 text-center">
        <div className="mb-3 text-3xl text-primary-400">“</div>
        <p className="italic text-ink-600 mb-4 leading-relaxed">{text}</p>
        <h4 className="font-bold text-ocean-600">{name}</h4>
      </div>
    </Reveal>
  );
}
