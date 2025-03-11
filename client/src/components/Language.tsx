import React from 'react';

const Languages: React.FC = () => {
  const languages = [
    "C++", "Java", "Python", "JavaScript", "C"
  ];

  return (
    <section id="languages" className="py-20 bg-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Supported Languages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Compile and run code in multiple programming languages</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {languages.map((language, index) => (
            <div key={index} className="bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-white">{language}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;