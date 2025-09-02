import genAI from "../config/genAI.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(question);

    const textResponse = result.response.text();
    res.json({ answer: textResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;