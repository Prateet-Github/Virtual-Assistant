import { useContext } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { dataContext } from "../UserContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { toggleRecognition, isListening, isSpeaking, loading } =
    useContext(dataContext);

  let displayImage = "/src/assets/friday.jpg";
  if (isListening) displayImage = "/src/assets/aiVoice.gif";
  if (isSpeaking) displayImage = "/src/assets/speak.gif";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex flex-col justify-center items-center overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* AI Avatar with Holographic Effect */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 w-72 h-72 border-2 border-orange-400 rounded-full opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ filter: "blur(1px)" }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 border border-amber-400 rounded-full opacity-50"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Pulsing aura */}
          <motion.div
            className="absolute inset-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-20 blur-md"
            animate={{
              scale: isListening ? [1, 1.3, 1] : isSpeaking ? [1, 1.2, 1] : 1,
              opacity: isListening ? [0.2, 0.6, 0.2] : isSpeaking ? [0.2, 0.8, 0.2] : 0.2,
            }}
            transition={{
              duration: 1.5,
              repeat: (isListening || isSpeaking) ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* Main AI Image */}
          <motion.div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-500 to-amber-500 shadow-2xl shadow-orange-500/50">
            <motion.img
              src={displayImage}
              alt="AI Avatar"
              className="w-full h-full object-cover"
              animate={{
                scale: isListening ? 1.05 : isSpeaking ? 1.03 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            />
            
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-500/10 to-transparent animate-pulse" />
          </motion.div>

          {/* Status indicators */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </motion.div>
            )}
            {isSpeaking && (
              <motion.div
                className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Volume2 className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Name with Glitch Effect */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-2"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            FRIDAY
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 font-light tracking-wider"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Your Virtual Assistant
          </motion.p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Main Mic Button */}
          <motion.button
            onClick={toggleRecognition}
            disabled={loading}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-50 blur-lg"
              animate={{
                opacity: isListening ? [0.5, 0.8, 0.5] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isListening ? Infinity : 0,
              }}
            />
            
            {/* Main button */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
              <motion.div
                animate={{
                  rotate: loading ? 360 : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: loading ? Infinity : 0,
                  ease: "linear",
                }}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-red-400" />
                ) : (
                  <Mic className="w-8 h-8 text-orange-400 group-hover:text-amber-400 transition-colors duration-300" />
                )}
              </motion.div>
            </div>

            {/* Ripple effect when active */}
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </motion.button>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  className="flex space-x-1"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-amber-400 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
                <span className="text-amber-400 font-medium tracking-wide">Processing...</span>
              </motion.div>
            )}

            {isListening && !loading && (
              <motion.div
                className="text-red-400 font-medium tracking-wide flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-2 h-2 bg-red-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
                <span>Listening...</span>
              </motion.div>
            )}

            {isSpeaking && (
              <motion.div
                className="text-green-400 font-medium tracking-wide flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                </motion.div>
                <span>Speaking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          {!isListening && !loading && !isSpeaking && (
            <motion.p
              className="text-gray-400 text- text-center max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Click the microphone or press
              <kbd className="px-2 py-1 bg-slate-700 rounded text-xs font-mono text-orange-300">
                Space
              </kbd>
              to start talking with your AI assistant
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default App;