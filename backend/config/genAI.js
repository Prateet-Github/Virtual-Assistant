// import { GoogleGenerativeAI } from "@google/generative-ai";
// console.log("Using API Key:", process.env.GEMINI_API_KEY); 
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// export default genAI;

import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI;

function getGenAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export default { getGenerativeModel: (config) => getGenAI().getGenerativeModel(config) };