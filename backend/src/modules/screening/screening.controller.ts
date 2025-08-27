import { Request, Response } from "express";
import { screeningDTO } from "./screening.validators.js";
import { createScreening, listScreenings } from "./screening.service.js";

export async function postScreening(req: Request, res: Response) {
  const parsed = screeningDTO.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid payload", details: parsed.error.flatten() });
  }
  const created = await createScreening(parsed.data);
  return res.status(201).json(created);
}

export async function getScreenings(req: Request, res: Response) {
  const limit = Number(req.query.limit ?? 20);
  const items = await listScreenings(Number.isFinite(limit) ? limit : 20);
  return res.json(items);
}
