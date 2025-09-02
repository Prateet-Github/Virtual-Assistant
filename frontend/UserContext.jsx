import { createContext, useRef, useState } from "react";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // speech Synthesis 
  function speak(text) {
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    // cancel old speech before new
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    utterance.onend = () => setIsSpeaking(false);
  }

  //  Speech Recognition
  const recognitionRef = useRef(null);

  if (!recognitionRef.current) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onend = () => {
      setIsListening(false);
      console.log("Recognition ended");
    };
  }

  const recognition = recognitionRef.current;

  function toggleRecognition() {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
      console.log("🎤 Listening started...");
    } else {
      recognition.stop();
      setIsListening(false);
      console.log("Listening stopped...");
    }
  }

  const value = {
    speak,          
    toggleRecognition,
    recognition,
    isListening,
    isSpeaking,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export default UserContext;