import { createContext, useRef, useState, useEffect } from "react";
import { API } from "./helper/api.js";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Text-to-speech
  const speak = (text) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    utterance.onend = () => setIsSpeaking(false);
  };

  // Keyboard event listener for spacebar

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.code === "Space" &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        event.stopPropagation();
        toggleRecognition();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isListening]); // Add isListening as dependency

  // recognition ref
  const recognitionRef = useRef(null);

  if (!recognitionRef.current) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    // onresult moved here
    recognitionRef.current.onresult = async (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript;
      console.log("Voice Input:", command);

      setLoading(true);
      try {
        const data = await API(command);
        console.log("AI Response:", data.answer);
        speak(data.answer);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      console.log("Recognition ended");
    };
  }

  const toggleRecognition = () => {
    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      console.log("🎤 Listening started...");
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Listening stopped...");
    }
  };

  const value = {
    speak,
    recognition: recognitionRef.current,
    toggleRecognition,
    isListening,
    isSpeaking,
    loading,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export default UserContext;
