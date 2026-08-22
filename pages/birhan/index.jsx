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
              <a href="#document" className="btn-primary text-lg">
                Read the Document <FaFilePdf />
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
            DOCUMENT
        ========================================================== */}
        <section id="document" className="scroll-mt-24 py-16 px-6">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-eyebrow">Official Document</span>
            <h3 className="section-title text-3xl md:text-4xl mt-4">
              Birhan Foundation <span className="text-gradient">Brochure</span>
            </h3>
            <p className="section-subtitle max-w-2xl mx-auto mt-4">
              Read the document online or download a copy to keep for reference.
            </p>
          </Reveal>

          <Reveal>
            <div className="max-w-5xl mx-auto glass-card p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-xl shadow-soft">
                    <FaFilePdf />
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-ink-800">Birhan Foundation.pdf</p>
                    <p className="text-sm text-ink-500">PDF · 1.3 MB</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={DOC_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
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

              <div className="relative w-full h-[75vh] min-h-[480px] rounded-2xl overflow-hidden border border-white/60 bg-white">
                <iframe
                  src={`${DOC_PDF}#toolbar=1&navpanes=0&view=FitH`}
                  title="Birhan Foundation Document"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
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
            CTA
        ========================================================== */}
        <section className="py-20 px-6 pb-24">
          <Reveal>
            <div className="glass-card max-w-3xl mx-auto p-10 md:p-12 text-center">
              <FaEnvelopeOpenText className="text-4xl mx-auto mb-4 text-primary-500" />
              <h3 className="section-title text-3xl mb-3">Want to know more?</h3>
              <p className="text-ink-500 text-lg mb-8 max-w-xl mx-auto">
                Reach out to our team and we’ll be happy to share more about the
                foundation and how you can get involved.
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