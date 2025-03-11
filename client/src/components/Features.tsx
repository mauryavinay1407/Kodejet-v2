interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 transition-transform hover:-translate-y-1 border-[1px] border-[#A90ABA]">
      <div className="bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
        </svg>
      ),
      title: "Multiple Languages",
      description: "Support for C, C++, Java, Python, JavaScript and more programming languages."
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        </svg>
      ),
      title: "Detailed Output",
      description: "Get comprehensive execution results including compile errors, runtime output, and execution time."
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
      ),
      title: "No Setup Required",
      description: "Start coding immediately without installing compilers, IDEs, or development environments."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900 ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose KodeJet?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A powerful code compiler built with developers in mind</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
