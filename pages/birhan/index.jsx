import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MainHeader } from "../../components/common/MainHeader";
import { Reveal } from "../../components/common/Reveal";
import {
  FaArrowRight,
  FaHeart,
  FaUsers,
  FaGraduationCap,
  FaRegLightbulb,
  FaExternalLinkAlt,
  FaDownload,
  FaFilePdf,
  FaEnvelopeOpenText,
  FaBookOpen,
  FaBullseye,
  FaHandsHelping,
  FaCheckCircle,
} from "react-icons/fa";

const DOC_PDF = "/added/birhan-foundation.pdf";

/* =========================================================
   Gallery images (served from public/added)
========================================================= */
const gallery = [
  { src: "/added/photo_2026-08-22_02-05-02.jpg", alt: "Birhan Foundation photo 1", width: 1280, height: 1263 },
  { src: "/added/photo_2026-08-22_02-05-04.jpg", alt: "Birhan Foundation photo 2", width: 1037, height: 1280 },
  { src: "/added/photo_2026-08-22_02-05-05.jpg", alt: "Birhan Foundation photo 3", width: 1280, height: 947 },
  { src: "/added/photo_2026-08-22_02-05-06.jpg", alt: "Birhan Foundation photo 4", width: 1227, height: 1061 },
  { src: "/added/photo_2026-08-22_02-05-07.jpg", alt: "Birhan Foundation photo 5", width: 1231, height: 1280 },
  { src: "/added/photo_2026-08-22_02-05-08.jpg", alt: "Birhan Foundation photo 6", width: 863, height: 1280 },
];

const pillars = [
  {
    icon: <FaGraduationCap className="text-white text-3xl" />,
    title: "Education",
    text: "Supporting learners with the resources and encouragement they need to grow and succeed.",
  },
  {
    icon: <FaUsers className="text-white text-3xl" />,
    title: "Community",
    text: "Bringing people together around shared goals of growth, support, and lasting opportunity.",
  },
  {
    icon: <FaRegLightbulb className="text-white text-3xl" />,
    title: "Empowerment",
    text: "Equipping individuals with the confidence and tools to shape their own bright futures.",
  },
];

/* =========================================================
   Impact stats pulled from the document
========================================================= */
const impactPoints = [
  "Provided educational materials and study resources to 60+ students in underserved rural communities.",
  "Collected and distributed textbooks, notebooks, pens, pencils, erasers, and other essential learning materials.",
  "Worked with local communities to identify students who lack access to basic educational resources.",
  "Mobilized community support and donations to help provide materials to students in need.",
  "Built a growing team of 20 members committed to expanding access to education across Ethiopia.",
];

export default function BirhanFoundationPage() {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Birhan Foundation" />

      <div className="font-sans text-ink-800 min-h-screen overflow-hidden">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative overflow-hidden px-6 pt-36 pb-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-primary-200 to-ocean-300 opacity-50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-36 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-accent-200 to-primary-200 opacity-40 blur-3xl"
          />

          <div className="relative max-w-5xl mx-auto">
            <div className="mx-auto mb-10 hover:scale-105 transition-transform duration-300">
              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-5xl shadow-glow">
                <FaHeart />
              </div>
            </div>

            <span className="section-eyebrow block mb-6">Aceit · Community</span>

            <h1 className="section-title text-5xl md:text-6xl leading-tight">
              Birhan <span className="text-gradient">Foundation</span>
            </h1>

            <p className="section-subtitle max-w-2xl mx-auto mt-6">
              Birhan — ብርሃን — means &ldquo;light&rdquo; in Amharic. The Birhan
              Foundation shines that light on students and communities through
              education, guidance, and the opportunities they need to thrive.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#story" className="btn-primary text-lg">
                Read Our Story <FaBookOpen />
              </a>
              <a href="#gallery" className="btn-ghost text-lg">
                View Gallery <FaArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            PILLARS
        ========================================================== */}
        <section className="py-16 px-6">
          <Reveal variant="up" className="text-center mb-12">
            <span className="section-eyebrow">What We Stand For</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              Committed to a <span className="text-gradient">Brighter Tomorrow</span>
            </h3>
            <p className="section-subtitle max-w-2xl mx-auto mt-4">
              Everything the foundation does is guided by a simple belief —
              every young person deserves the chance to reach their potential.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 120} className="h-full">
                <div className="glass-card h-full p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white shadow-soft">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-ink-800">{pillar.title}</h4>
                  <p className="text-ink-500">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================================
            OUR STORY (readable content, not a PDF embed)
        ========================================================== */}
        <section id="story" className="scroll-mt-24 py-16 px-6">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-eyebrow">How It Started</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              Our <span className="text-gradient">Story</span>
            </h3>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-10 space-y-5 text-ink-600 leading-relaxed text-lg">
              <p>
                Birhan Foundation was founded following a field trip taken to
                the rural areas of Ethiopia, where our founder, Hiyabeal Assefa
                Negussie, witnessed a severe lack of educational resources.
              </p>
              <p>
                A month later, our founder started researching the state of
                educational resources in rural areas, and the results were
                disappointing. Even in urban areas, underprivileged kids had
                little to no access to studying materials to aid their
                education.
              </p>
              <p>
                Being a 15-year-old high school student, funding this
                initiative on his own was a challenge, but that didn&rsquo;t
                stop him. Driven by a clear purpose, Hiyabeal looked for
                creative ways to make sure these children got the education
                they deserved.
              </p>
              <p>
                Hiyabeal began by visiting local bookstores to request book
                donations for children who lacked access to education. At the
                same time, he started raising funds from the community to
                purchase essential study materials, including pencils, pens,
                notebooks, erasers, and science textbooks.
              </p>
              <p>
                Three months after that initial visit, Hiyabeal returned to
                the same rural community to deliver his first wave of
                collected materials. While he originally thought this would be
                a one-time effort to give back, witnessing the radiant
                smiles, genuine warmth, and heartfelt gratitude of the
                children changed everything. Hiyabeal realized he wanted, and
                needed, to do far more.
              </p>
              <p>
                After that trip, Hiyabeal set out to start a non-profit that
                would help children get their futures brightened through
                education, and named it &ldquo;Birhan Foundation&rdquo; —
                &ldquo;Birhan&rdquo; is an Amharic word meaning
                &ldquo;light.&rdquo;
              </p>
              <p>
                After creating the non-profit, Hiyabeal became the Founder and
                Executive Director of Birhan Foundation. It now has 20 members
                making an impact on one of the biggest problems in Ethiopia.
              </p>
            </div>
          </Reveal>
        </section>

        {/* =========================================================
            OUR IMPACT
        ========================================================== */}
        <section className="py-16 px-6">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-eyebrow">By the Numbers</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              Our <span className="text-gradient">Impact</span>
            </h3>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-10">
              <p className="text-ink-600 leading-relaxed text-lg mb-6">
                Since its founding, Birhan Foundation has worked to make
                education more accessible to children who face limited access
                to essential learning resources. What began as a small
                initiative has grown into a community-driven foundation with
                20 dedicated members, working together to support students
                and strengthen educational opportunities.
              </p>

              <p className="font-bold text-ink-800 mb-4">Through our efforts, we have:</p>

              <ul className="space-y-3 mb-6">
                {impactPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-ink-600">
                    <FaCheckCircle className="text-primary-500 mt-1 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="text-ink-600 leading-relaxed text-lg">
                Our impact is not measured only by the number of materials we
                distribute, but by the opportunities those materials create.
                Every book, notebook, and learning resource is a step toward
                helping a student learn, grow, and build a brighter future.
              </p>
            </div>
          </Reveal>
        </section>

        {/* =========================================================
            WHAT WE DO
        ========================================================== */}
        <section className="py-16 px-6">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-eyebrow">Our Approach</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              What We <span className="text-gradient">Do</span>
            </h3>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-10 space-y-5 text-ink-600 leading-relaxed text-lg">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white shadow-soft">
                <FaHandsHelping className="text-2xl" />
              </div>
              <p>
                Birhan Foundation works to close the education gap for
                underprivileged children in Ethiopia, both in rural
                communities and underserved urban neighborhoods.
              </p>
              <p>
                We do this by collecting book donations from local bookstores
                and community members, and by raising funds to purchase
                essential study materials, including pencils, pens,
                notebooks, erasers, and science textbooks. Once collected,
                our team travels directly to the communities that need them
                most to deliver these resources by hand.
              </p>
              <p>
                We don&rsquo;t just drop off supplies and leave. We return to
                these communities, build relationships with the families and
                schools there, and look for new ways to support the
                children&rsquo;s education over time.
              </p>
            </div>
          </Reveal>
        </section>

        {/* =========================================================
            OUR VISION
        ========================================================== */}
        <section className="py-16 px-6">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-eyebrow">Looking Ahead</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              Our <span className="text-gradient">Vision</span>
            </h3>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-10 space-y-5 text-ink-600 leading-relaxed text-lg">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white shadow-soft">
                <FaBullseye className="text-2xl" />
              </div>
              <p>
                We believe every child deserves access to an education,
                regardless of where they were born or how much their family
                can afford.
              </p>
              <p>
                Birhan means &ldquo;light&rdquo; in Amharic, and that&rsquo;s
                exactly what we hope education becomes for the children we
                work with: a light that opens doors, builds confidence, and
                brightens their future. We envision an Ethiopia where a
                child&rsquo;s zip code or family income never determines
                whether they get to learn, dream, and grow.
              </p>
              <p>
                We&rsquo;re working toward a future where every classroom, in
                every community, urban or rural, has the basic resources
                children need to thrive.
              </p>
            </div>
          </Reveal>
        </section>

        {/* =========================================================
            DOWNLOAD ORIGINAL DOCUMENT (kept for reference)
        ========================================================== */}
        <section id="document" className="scroll-mt-24 py-16 px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto glass-card p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-xl shadow-soft">
                    <FaFilePdf />
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-ink-800">Birhan Foundation.pdf</p>
                    <p className="text-sm text-ink-500">Original brochure · PDF</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={DOC_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-sm"
                  >
                    Open in new tab <FaExternalLinkAlt />
                  </a>
                  <a
                    href={DOC_PDF}
                    download="Birhan-Foundation.pdf"
                    className="btn-ghost text-sm"
                  >
                    Download <FaDownload />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* =========================================================
            GALLERY
        ========================================================== */}
        <section id="gallery" className="scroll-mt-24 py-16 px-6">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-eyebrow">Gallery</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              Moments with Birhan Foundation
            </h3>
            <p className="section-subtitle max-w-2xl mx-auto mt-4">
              A look at the people, places, and moments that make the foundation’s
              work possible.
            </p>
          </Reveal>

          <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5">
            {gallery.map((img) => (
              <Reveal
                key={img.src}
                variant="zoom"
                className="break-inside-avoid mb-5"
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-white/60 group cursor-zoom-in"
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================================
            CTA / GET INVOLVED
        ========================================================== */}
        <section className="py-20 px-6 pb-24">
          <Reveal>
            <div className="glass-card max-w-3xl mx-auto p-10 md:p-12 text-center">
              <FaEnvelopeOpenText className="text-4xl mx-auto mb-4 text-primary-500" />
              <h3 className="section-title text-3xl mb-3">Get Involved</h3>
              <p className="text-ink-500 text-lg mb-4 max-w-xl mx-auto">
                Birhan Foundation grows through the support of people and
                organizations who believe in what we&rsquo;re doing. Whether
                you want to partner with your business or organization,
                collaborate on a project, or simply learn more about our
                work, we&rsquo;d love to hear from you.
              </p>
              <p className="text-ink-500 text-lg mb-8 max-w-xl mx-auto">
                Together, we can make sure more children get the light they
                deserve.
              </p>
              <Link href="/contact" className="btn-primary text-lg inline-flex">
                Contact Us <FaArrowRight />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </React.Fragment>
  );
}