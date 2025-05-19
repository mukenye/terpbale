// server/index.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');

const app = express();

// Basic CORS configuration
app.use(cors());
app.use(express.json());

// Simplified static files serving
app.use(express.static(path.join(__dirname, '../client/public')));

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', environment: process.env.NODE_ENV || 'development' });
});

// GET events with error handling
app.get('/api/events', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Events API error:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// POST RSVP with validation
app.post('/api/rsvp', async (req, res) => {
  try {
    const { event_id, user_id } = req.body;
    
    if (!event_id || !user_id) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['event_id', 'user_id']
      });
    }

    const { data, error } = await supabase
      .from('rsvps')
      .insert([{ 
        event_id, 
        user_id, 
        created_at: new Date().toISOString() 
      }])
      .select();
      
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('RSVP API error:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`> Local: http://localhost:${PORT}`);
  console.log(`> API: http://localhost:${PORT}/api/events`);
});

// Export for Vercel
module.exports = app;