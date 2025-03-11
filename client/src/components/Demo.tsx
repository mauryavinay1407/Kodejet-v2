import React from "react";

const Demo: React.FC = () => {
    return (
        <section id="demo" className="py-8 bg-slate-900">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                        See KodeJet in Action
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Write, compile, and run code in seconds
                    </p>
                </div>
                <div className="flex flex-col items-center w-full">
                    <video
                        src="demo.mp4"
                        className="w-88 h-64 sm:w-1/2 sm:h-72 rounded-lg shadow-2xl border border-gray-800"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>
        </section>
    );
};

export default Demo;
