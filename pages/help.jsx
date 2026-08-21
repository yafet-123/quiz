import { MainHeader } from '../components/common/MainHeader';
import { Reveal } from '../components/common/Reveal';
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const faqs = [
  { question: "How can I reset my password?", answer: "If you’ve forgotten your password, click on the 'Forgot Password' link on the login page and follow the instructions." },
  { question: "How do I access my purchased resources?", answer: "Log in to your account, go to 'My Resources' and you will find all your purchased notes and quizzes there." },
  { question: "Can I request new content?", answer: "Yes! You can contact us via email at support@savemyexams.co.uk with your content requests." },
  { question: "Who can I contact for technical issues?", answer: "For any technical issues, please email support@savemyexams.co.uk and we’ll respond as soon as possible." },
  { question: "How do I change my account email?", answer: "Go to your account settings and update your email address there." },
  { question: "How can I download study resources?", answer: "Once purchased, resources are available under 'My Resources' for download." },
  { question: "Are the notes suitable for all exam boards?", answer: "Our notes cover a variety of boards, but always check the specific subject page for compatibility." },
  { question: "Can I share my account with friends?", answer: "Accounts are personal and sharing is not permitted according to our terms of service." },
  { question: "Do you offer refunds?", answer: "Refunds are available under certain conditions. Please see our Refund Policy page." },
  { question: "How often is content updated?", answer: "We update content regularly to reflect the latest curriculum changes." },
  { question: "Is there a mobile app?", answer: "Currently, our platform is web-based and mobile-friendly; we do not have a separate app yet." },
  { question: "Can I print the notes?", answer: "Yes, you can download PDF versions and print them if needed." },
  { question: "Are answers included with quizzes?", answer: "Yes, all practice quizzes include answers and explanations." },
  { question: "Do you provide past papers?", answer: "We provide selected past papers and solutions where available." },
  { question: "Can I request a specific topic?", answer: "Yes, you can submit requests via email, and we’ll consider adding the topic." },
  { question: "How secure is my personal information?", answer: "We take privacy seriously. All personal information is stored securely and never shared without consent." },
];


const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <React.Fragment>
      <MainHeader title="Aceit : Help Page" />
      <div className="font-sans text-ink-800 min-h-screen py-20 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="section-eyebrow">Support</span>
            <h1 className="section-title text-4xl md:text-5xl mt-4">
              Help & <span className="text-gradient">Quick Answers</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto mt-4">
              Find answers to common questions below. Click on a question to see the answer.
            </p>
          </Reveal>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Reveal key={index} className="stagger-1">
                <div
                  className="glass-card p-6 md:p-7 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="text-lg md:text-xl font-semibold text-ink-800">
                      {faq.question}
                    </h2>
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        openIndex === index
                          ? "bg-gradient-to-br from-primary-500 to-ocean-500 text-white shadow-soft"
                          : "bg-primary-50 text-ocean-600"
                      }`}
                    >
                      {openIndex === index ? (
                        <AiOutlineMinus size={20} />
                      ) : (
                        <AiOutlinePlus size={20} />
                      )}
                    </span>
                  </div>
                  {openIndex === index && (
                    <p className="text-ink-500 mt-4 text-base md:text-lg leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Help;
