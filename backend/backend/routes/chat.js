const express = require('express');
const router = express.Router();

router.post('/message', async (req, res) => {
  const { message } = req.body;
  // Placeholder response - we'll wire this to real logic next
  res.json({ reply: `Zyvora received: "${message}"` });
});

module.exports = router;