// server/index.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');

const app = express();
app.use(cors(), express.json());

// *** Add this block to serve your static site ***
app.use(express.static(path.join(__dirname, '../client/public')));

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' });
});

// GET events
app.get('/api/events', async (_req, res) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_time', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST RSVP
app.post('/api/rsvp', async (req, res) => {
  const { event_id, user_id } = req.body;
  if (!event_id || !user_id) return res.status(400).json({ error: 'Missing event_id or user_id' });
  const { data, error } = await supabase
    .from('rsvps')
    .insert([{ event_id, user_id, created_at: new Date().toISOString() }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
