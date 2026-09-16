import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
