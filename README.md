# video-api
Simple api to return sample videos

## Description
A basic Node.js API with Express that serves video files via a GET endpoint.

## Installation
```bash
npm install
```

## Running the API
```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Video API",
  "endpoints": {
    "video": "/video"
  }
}
```

### GET /video
Returns a sample MP4 video file.

**Response:**
- Content-Type: video/mp4
- Returns the video file stored at `videos/sample.mp4`

**Example:**
```bash
curl http://localhost:3000/video -o video.mp4
```

## Project Structure
```
video-api/
├── server.js          # Main API server
├── videos/            # Video files directory
│   └── sample.mp4     # Sample video file
├── package.json       # Node.js dependencies
└── README.md          # This file
```

