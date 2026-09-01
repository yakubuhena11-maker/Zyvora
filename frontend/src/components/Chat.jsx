import React, { useState } from 'react';
import { sendMessage } from '../api';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await sendMessage(input, token);
      setMessages((prev) => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error reaching Zyvora.' }]);
    }
  };

  return (
    <div>
      <h2>Zyvora Chat</h2>
      <div style={{ minHeight: '300px', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.sender}:</strong> {m.text}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;