const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const router = express.Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }]
    });

    const reply = response.content[0].text;
    res.json({ reply });
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
});

module.exports = router;