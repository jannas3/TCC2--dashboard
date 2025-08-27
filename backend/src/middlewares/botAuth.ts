import { Request, Response, NextFunction } from "express";

export function botAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("X-Bot-Secret");
  if (!header) return res.status(401).json({ error: "missing auth header" });
  if (header !== process.env.BOT_SHARED_SECRET) return res.status(403).json({ error: "invalid secret" });
  next();
}
