import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Demo from '../components/Demo';
import Languages from '../components/Language';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-slate-900 text-gray-100 min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Demo />
      <Languages />
      <Footer />
    </div>
  );
};

export default Home;