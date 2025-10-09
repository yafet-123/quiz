import Head from "next/head";
import React from "react";

export const MainHeader = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="MatricMate"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Ethiopia is entering a new era of digital testing; MatricMate is here to support every step. Access textbooks, test your knowledge, and get instant answers, all from one platform."
        />
        <meta property="og:image" content="/public/favicon.ico" />
        <meta property="og:url" content="https://helenzeray.com" />
        <meta property="og:type" content="website" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
    </div>
  );
};
