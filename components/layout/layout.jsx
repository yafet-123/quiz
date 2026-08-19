import React from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Footer } from '../common/Footer';
import { Navbar } from '../common/Navbar';

const Layout = ({ children, session, pageProps }) => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col min-h-screen backdrop-container">
      <Navbar session={session} pageProps={pageProps} />
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


