import { useContext, useState } from "react";
import { Mic } from "lucide-react";
import { dataContext } from "../UserContext.jsx";
import { motion } from "framer-motion";

const App = () => {
  const { speak, recognition, toggleRecognition, isListening, isSpeaking } =
    useContext(dataContext);
  const [loading, setLoading] = useState(false);

  recognition.onresult = async (event) => {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript;
    console.log("Voice Input:", command);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: command }),
      });

      const data = await res.json();
      console.log("AI Response:", data.answer);

      speak(data.answer);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  let displayImage = "/src/assets/ai.png";
  if (isListening) displayImage = "/src/assets/aiVoice.gif";
  if (isSpeaking) displayImage = "/src/assets/speak.gif";

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <motion.img
        src={displayImage}
        alt="AI Avatar"
        className="w-xs rounded-full shadow-lg border-4 border-purple-500"
        animate={{ scale: isListening ? 1.1 : 1 }}
        transition={{
          duration: 0.5,
          repeat: isListening ? Infinity : 0,
          repeatType: "reverse",
        }}
      />

      <div className="mt-10 text-2xl text-purple-600 font-serif">
        I'm Friday your Virtual Assistant
      </div>

      <button className="mt-4" onClick={toggleRecognition} disabled={loading}>
        <Mic
          className={`size-12 ${
            isListening
              ? "text-red-500 animate-pulse"
              : loading
              ? "text-gray-400"
              : "text-purple-500"
          }`}
        />
      </button>

      {loading && <p className="text-purple-400 mt-4">Thinking...</p>}
    </div>
  );
};

export default App;
