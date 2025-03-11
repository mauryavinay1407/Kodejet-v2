import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {

  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-20 text-center bg-gradient-to-r from-slate-900/90 to-slate-900/90 bg-center bg-cover">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-white">
          Code, Compile and Run Online
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          KodeJet is a powerful, secure online compiler that supports multiple programming languages. Write, test, and execute code from anywhere, anytime.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
             onClick={() => navigate("/playground")}
            className="px-5 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Start Coding Now
          </button>
          <button 
            onClick={() => handleScroll("demo")}
            className="px-5 py-2 rounded-md font-medium text-white border border-white hover:bg-white/10 transition-colors"
          >
            See Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
