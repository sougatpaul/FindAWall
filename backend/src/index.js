import fetch from 'node-fetch';
import Unsplash from 'unsplash-js';
import { toJson } from 'unsplash-js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

dotenv.config();

global.fetch = fetch;

const unsplash = new Unsplash({
  accessKey: process.env.ACCESS_KEY,
  secret: process.env.SECRET_KEY,
  callbackUrl: process.env.CALLBACK_URL,
});

const app = express();

const logsDir = path.join(process.cwd(), 'logs');
fs.mkdirSync(logsDir, { recursive: true });

app.use(cors());
app.use(morgan('dev'));
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(logsDir, 'requests.log'), { flags: 'a' }),
}));


app.get('/api/photos', (req, res) => {
  unsplash.photos
    .listPhotos(req.query.page, req.query.count)
    .then(toJson)
    .then((json) => res.json(json))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Unable to fetch photos' });
    });
});

app.get('/api/photos/search', (req, res) => {
  unsplash.search
    .photos(req.query.keyword, req.query.page, req.query.count)
    .then(toJson)
    .then((json) => res.json(json))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Unable to search photos' });
    });
});

const clientBuildPath = path.resolve(__dirname, '../../unsplash-gallery/build');

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  console.log(`🚀 REST APIs at http://localhost:${PORT}/api/photos`);
});
