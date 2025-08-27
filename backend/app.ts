import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import screeningRoutes from './modules/screening/screening.routes';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 })); // 120 req/min

app.use('/api', screeningRoutes);

app.get('/health', (_, res) => res.json({ ok: true }));

export default app;
