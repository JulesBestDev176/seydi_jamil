import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Programs />
      <Features />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;