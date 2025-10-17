// pages/contact.js
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
    <div className="bg-gray-50 min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">
          Help & Quick Answers
        </h1>
        <p className="text-gray-600 mb-12 text-center text-lg">
          Find answers to common questions below. Click on a question to see the answer.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow cursor-pointer mb-5"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {faq.question}
                </h2>
                <span className="text-purple-600">
                  {openIndex === index ? (
                    <AiOutlineMinus size={24} />
                  ) : (
                    <AiOutlinePlus size={24} />
                  )}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 mt-4 text-lg">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
