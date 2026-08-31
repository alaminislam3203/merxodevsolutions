import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GsapTextProvider from '@/components/GsapTextProvider';

// (site) group layout - WITH Navbar and Footer
// Wraps all public pages

export default function SiteLayout({ children }) {
  return (
    <GsapTextProvider>
      <Navbar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
    </GsapTextProvider>
  );
}