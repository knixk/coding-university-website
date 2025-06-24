import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { X } from 'lucide-react';

const RequirementSection = ({ title, items }) => (
  <div>
    <h3 className="text-2xl font-semibold text-red-700 mb-4">{title}</h3>
    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const RequirementsPage = () => (
  <div className="container mx-auto px-4 py-12">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Admission Requirements</h2>
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <p className="text-lg text-gray-700 mb-6">
        To be considered for admission to Coding University, applicants must meet the following general requirements.
        Specific program requirements may vary.
      </p>

      <div className="space-y-6">
        <RequirementSection
          title="Academic Prerequisites"
          items={[
            "High school diploma or equivalent (for undergraduate programs)",
            "Bachelor's degree from an accredited institution (for graduate programs)",
            "Strong academic record, especially in mathematics and science courses",
          ]}
        />
        <RequirementSection
          title="Standardized Tests"
          items={[
            "SAT/ACT scores (for undergraduate applicants, optional for some programs)",
            "GRE scores (for graduate applicants, optional for some programs)",
            "TOEFL/IELTS scores (for international applicants whose native language is not English)",
          ]}
        />
        <RequirementSection
          title="Supporting Documents"
          items={[
            "Official transcripts from all previously attended institutions",
            "Personal statement or essay",
            "Letters of recommendation (typically 2-3)",
            "Resume/CV (especially for graduate applicants)",
          ]}
        />
      </div>
      <p className="mt-8 text-md text-gray-600 text-center">
        For detailed, program-specific requirements, please refer to our program pages or contact the admissions office.
      </p>
    </div>
  </div>
);

const AidOption = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-b-4 border-red-400">
    <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-700">{description}</p>
  </div>
);

const TuitionPage = () => (
  <div className="container mx-auto px-4 py-12">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Tuition & Financial Aid</h2>
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <p className="text-lg text-gray-700 mb-6">
        Coding University is committed to making quality education accessible. We offer various options to help
        students finance their education. Below is an overview of our tuition fees and available financial aid.
      </p>

      {/* Tuition Table */}
      <h3 className="text-2xl font-semibold text-red-700 mb-4">Annual Tuition Fees (Estimated)</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 border-b">Program Level</th>
              <th className="py-3 px-4 border-b">Tuition</th>
              <th className="py-3 px-4 border-b">Fees</th>
              <th className="py-3 px-4 border-b">Total (Approx.)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">Undergraduate</td>
              <td className="py-3 px-4">$25,000</td>
              <td className="py-3 px-4">$2,500</td>
              <td className="py-3 px-4 font-semibold">$27,500</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">Graduate (Masters)</td>
              <td className="py-3 px-4">$30,000</td>
              <td className="py-3 px-4">$3,000</td>
              <td className="py-3 px-4 font-semibold">$33,000</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Graduate (Ph.D.)</td>
              <td className="py-3 px-4">$28,000</td>
              <td className="py-3 px-4">$2,800</td>
              <td className="py-3 px-4 font-semibold">$30,800</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        *Note: These are estimated annual costs and may vary. Please consult the official university catalog for exact figures.
      </p>

      {/* Financial Aid Section */}
      <h3 className="text-2xl font-semibold text-red-700 mb-4">Financial Aid Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AidOption
          title="Scholarships"
          description="Merit-based, need-based, and external scholarships available. Apply early!"
        />
        <AidOption
          title="Grants"
          description="Non-repayable funds awarded based on financial need."
        />
        <AidOption
          title="Student Loans"
          description="Federal and private loan options to cover educational expenses."
        />
        <AidOption
          title="Work-Study Programs"
          description="Opportunities for part-time employment on campus to earn money for school."
        />
      </div>
      <p className="mt-8 text-md text-gray-600 text-center">
        Our financial aid office is ready to assist you. Visit our financial aid portal or contact us for personalized guidance.
      </p>
      <div className="text-center mt-6">
        <button className="bg-gray-200 text-red-700 font-bold py-3 px-8 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
          Visit Financial Aid Portal
        </button>
      </div>
    </div>
  </div>
);

// Chat Assistant Component
const ChatAssistant = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial system message to tailor the AI's responses
  const initialSystemMessage = {
    role: "user",
    parts: [{ text: "You are a helpful and knowledgeable assistant for Coding University. Provide information about our programs, admissions, faculty, and general university life. Keep your responses concise and relevant to the university." }],
    isSystem: true // Custom flag to mark this as a system prompt, not for display
  };

  useEffect(() => {
    // Only add the system message once when the component mounts
    if (messages.length === 0) {
      setMessages([initialSystemMessage]);
    }
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom of chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let chatHistory = messages
        .filter(msg => !msg.isSystem)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));
      
      chatHistory.unshift({ role: "user", parts: [{ text: initialSystemMessage.parts[0].text }] });

      chatHistory.push({ role: "user", parts: [{ text: input }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Provide your Gemini API key here securely
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
        const botResponse = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: "Sorry, I couldn't get a response. Please try again." }]);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: "An error occurred while connecting to the assistant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[450px] z-50">
      {/* Chat Header */}
      <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <h4 className="font-semibold text-lg">Coding University Bot</h4>
        <button onClick={onClose} className="text-white hover:text-gray-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white">
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.filter(msg => !msg.isSystem).length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-12">How can I help you today about Coding University?</p>
        )}
        {messages.filter(msg => !msg.isSystem).map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[75%] text-sm ${
                msg.sender === 'user'
                  ? 'bg-red-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-gray-200 text-gray-800 animate-pulse text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Coding University..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
            disabled={isLoading}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 7m-1.93 7.82L2 22l4.18-8.07c-.48-.84-.7-1.74-.63-2.65.07-.9.37-1.77.89-2.52L19 2z"/></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

const Navigation = () => (
  <nav className="bg-red-600 p-4 text-white flex justify-center space-x-6">
    <Link to="/" className="hover:underline">Home</Link>
    <Link to="/requirements" className="hover:underline">Admission Requirements</Link>
    <Link to="/tuition" className="hover:underline">Tuition & Financial Aid</Link>
  </nav>
);

const Home = ({ onOpenChat }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to Coding University</h1>
    <p className="text-lg text-gray-700 mb-10">Your journey to coding mastery starts here!</p>
    <button
      onClick={onOpenChat}
      className="bg-red-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-200"
    >
      Chat with our Assistant
    </button>
  </div>
);

const App = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home onOpenChat={() => setShowChat(true)} />} />
        <Route path="/requirements" element={<RequirementsPage />} />
        <Route path="/tuition" element={<TuitionPage />} />
      </Routes>
      {showChat && <ChatAssistant onClose={() => setShowChat(false)} />}
    </Router>
  );
};

export default App;