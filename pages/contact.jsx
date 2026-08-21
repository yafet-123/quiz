import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MainHeader } from '../components/common/MainHeader';
import { Reveal } from '../components/common/Reveal';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/SentMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const socialMedia = [
    { icon: <FaFacebook size={30} />, url: "#" },
    { icon: <FaInstagram size={30} />, url: "#" },
    { icon: <FaLinkedin size={30} />, url: "#" },
    { icon: <FaTwitter size={30} />, url: "#" },
  ];

  return (
    <React.Fragment>
      <MainHeader title="Aceit : Contact Page" />
      <div className="font-sans text-ink-800 min-h-screen py-20 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="section-eyebrow">Get In Touch</span>
            <h1 className="section-title text-4xl md:text-5xl mt-4">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto mt-4">
              Fill out the form below and we will get back to you as soon as possible.
            </p>
          </Reveal>

          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-6"
            >
              <div>
                <label className="block font-semibold mb-2 text-ink-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-fancy"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-ink-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-fancy"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-ink-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-fancy"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-ink-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-fancy resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-lg w-full sm:w-auto"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {success && <p className="text-green-600 mt-3">{success}</p>}
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex justify-center gap-6 mt-10">
              {socialMedia.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 rounded-2xl text-ocean-600 hover:text-primary-600 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactPage;
