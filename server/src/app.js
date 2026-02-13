import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRoutes from './routes/portfolioRoutes.js';

dotenv.config();

const app = express();

const configuredOrigins = (
  process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isDevLocalOrigin = (origin) =>
  /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isConfiguredOrigin = configuredOrigins.includes(origin);
      const isLocalDevOrigin = process.env.NODE_ENV !== 'production' && isDevLocalOrigin(origin);

      if (isConfiguredOrigin || isLocalDevOrigin) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running.' });
});

app.use('/api', portfolioRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
