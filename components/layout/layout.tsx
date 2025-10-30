import React from 'react';
import { Footer } from '../common/Footer';
import { Navbar } from '../common/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  session?: any;
  pageProps?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, session, pageProps }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} pageProps={pageProps} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

