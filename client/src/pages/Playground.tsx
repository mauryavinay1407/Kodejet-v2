import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaSun, FaMoon, FaPlay, FaTerminal, FaClipboard } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";
import stubs from "../../Stubs";
import moment from "moment";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Playground: React.FC = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"cpp" | "py" | "c" | "java" | "js">("cpp");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [jobData, setJobdata] = useState(null);
  
  const {darkMode,toggleTheme} = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    setCode(stubs[language] || "");
  }, [language]);

  const handleCompile = async () => {
    try {
      setIsCompiling(true);
      setOutput("");
      setStatus("");
      setJobId("");
      setJobdata(null);
      const response: any = await axios.post(`${BASE_URL}/api/run`, {
        language,
        code,
      });

      setJobId(response.data.jobId);
      let intervalId: any;

      intervalId = setInterval(async () => {
        try {
          const { data: dataRes } = await axios.get(
            `${BASE_URL}/api/status?id=${response.data.jobId}`
          );
          const { success, job, error } = dataRes;

          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            if (jobStatus === "pending") return;
            setOutput(jobOutput);
            setJobdata(job);
            clearInterval(intervalId);
            setIsCompiling(false);
          } else {
            setStatus("Error: Retry!");
            console.error(error);
            clearInterval(intervalId);
            setOutput(error);
            setIsCompiling(false);
          }
        } catch (err) {
          clearInterval(intervalId);
          setIsCompiling(false);
          toast.error("Error checking job status");
        }
      }, 1000);
    } catch (err: any) {
      setIsCompiling(false);
      let { response } = err;
      if (response) setOutput(response.data.error.stderr);
      else setOutput("Error connecting to server");
      console.log(err);
      toast.error("Compilation failed");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard
        .writeText(output)
        .then(() => {
          toast.success("Output copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Failed to copy output");
        });
    } else {
      toast.error("No output to copy");
    }
  };

  const handleLangSwitch = (newLang: "cpp" | "py" | "java" | "js" | "c") => {
    toast(
      (t) => (
        <div>
          <p>
            Are you sure you want to change language?⚠️Your current code will be lost.
          </p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => {
                toast.dismiss(t.id); 
                setLanguage(newLang);
                setJobId("");
                setOutput("");
                setStatus("");
                setJobdata(null);
                toast.success("Language switched");
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleShowJobDetails = () => {
    if (!jobData) return "";
    let result = "";
    const { submittedAt, startedAt, completedAt } = jobData;
    const submitTime = moment(submittedAt).toString();
    result += `Code Submitted At: ${submitTime}`;

    if (!startedAt || !completedAt) return result;
    const startTime = moment(startedAt);
    const endTime = moment(completedAt);
    const diff = endTime.diff(startTime, "seconds", true);
    result += ` Execution Time: ${diff}s`;
    return result;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center py-4 px-2 sm:py-8 sm:px-4">
      <div className="w-full max-w-8xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 cursor-pointer"  onClick={() => navigate("/")}>
            <img src="logo.svg" alt="KodeJet Logo" className="h-8 sm:h-10" />
            <h1 className="text-2xl sm:text-3xl font-bold font-fira-code">KodeJet</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Choose Language:</span>
              <select
                className="bg-gray-500 dark:bg-gray-700 text-white p-2 rounded-md focus:outline-none"
                value={language}
                onChange={(e) =>
                  handleLangSwitch(e.target.value as "cpp" | "py" | "java" | "js" | "c")
                }
              >
                <option value="cpp">C++</option>
                <option value="py">Python</option>
                <option value="java">Java</option>
                <option value="js">JavaScript</option>
                <option value="c">C</option>
              </select>
            </div>

            <button
              className="p-2 bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-full transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border-2 dark:border border-gray-900 dark:border-gray-700">
            <textarea
              className="w-full h-[52vh] sm:h-[68vh] p-4 bg-transparent text-gray-800 dark:text-gray-200 font-fira-code focus:outline-none resize-none"
              placeholder="Write your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border-2 dark:border border-gray-900 dark:border-gray-700 relative">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <FaTerminal className="mr-2" /> Output
              </h2>
              <button
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={handleCopy}
                aria-label="Copy output"
              >
                <FaClipboard size={20} />
              </button>
            </div>

            <div className="p-4 overflow-auto max-h-64">
              {jobId && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Job ID: {jobId}
                </p>
              )}

              <SyntaxHighlighter
                language={language}
                style={darkMode ? vscDarkPlus : vs}
                customStyle={{
                  background: "transparent",
                  backgroundColor: "transparent",
                  padding: 0,
                  margin: 0,
                  overflowX: "auto",
                }}
              >
                {status || "Run your code to see output"}
              </SyntaxHighlighter>
              <SyntaxHighlighter
                language={language}
                style={darkMode ? vscDarkPlus : vs}
                customStyle={{
                  background: "transparent",
                  backgroundColor: "transparent",
                  padding: 0,
                  margin: 0,
                  overflowX: "auto",
                }}
              >
                {output}
              </SyntaxHighlighter>
              <SyntaxHighlighter
                language={language}
                style={darkMode ? vscDarkPlus : vs}
                customStyle={{
                  background: "transparent",
                  backgroundColor: "transparent",
                  padding: 0,
                  margin: 0,
                  overflowX: "auto",
                }}
              >
                {handleShowJobDetails()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-center">
          <button
            className={`
              px-6 py-3 flex items-center space-x-2 
              ${
                isCompiling
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              text-white rounded-lg transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            onClick={handleCompile}
            disabled={isCompiling}
          >
            <FaPlay />
            <span>{isCompiling ? "Compiling..." : "Compile & Run"}</span>
          </button>
        </div>
      </div>
 <footer className="pt-2 w-full text-gray-400 border-t border-gray-800">
       <div className="w-full max-w-7xl mx-auto px-4 text-center">
         <p>&copy; 2025 KodeJet. All rights reserved.</p>
       </div>
     </footer>
    </div>
  );
};

export default Playground;

