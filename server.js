const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// GET endpoint to retrieve the video file
app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'videos', 'sample.mp4');
  
  // Check if file exists
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Get file stats for content-length
  const stat = fs.statSync(videoPath);
  
  // Set appropriate headers
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': stat.size
  });
  
  // Stream the video file
  const readStream = fs.createReadStream(videoPath);
  readStream.pipe(res);
});

// Root endpoint for API info
app.get('/', (req, res) => {
  res.json({
    message: 'Video API',
    endpoints: {
      video: '/video'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Video API server running on port ${PORT}`);
});

module.exports = app;
