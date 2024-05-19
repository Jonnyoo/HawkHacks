const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001; 

app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI('AIzaSyD6rL1WBUcEeuhtjwxCHHo6jxeTRGDYqUs');

app.post('/generate-content', async (req, res) => {
  const { prompt } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent(prompt);
    
    const response = await result.response;
    const text = await response.text();
    res.json({ text });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});