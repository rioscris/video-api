const express = require('express');
const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// GET endpoint to retrieve the video file
app.get('/video', async (req, res) => {
  const videoPath = path.join(__dirname, 'videos', 'sample.mp4');
  
  try {
    // Check if file exists and get stats
    const stat = await fsPromises.stat(videoPath);
    
    // Set appropriate headers
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': stat.size
    });
    
    // Stream the video file
    const readStream = fs.createReadStream(videoPath);
    readStream.pipe(res);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'Video not found' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
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
