export type RiskLevel = "MINIMO"|"LEVE"|"MODERADO"|"MODERADAMENTE_GRAVE"|"GRAVE";

export function phq9Level(score: number): RiskLevel {
  if (score <= 4) return "MINIMO";
  if (score <= 9) return "LEVE";
  if (score <= 14) return "MODERADO";
  if (score <= 19) return "MODERADAMENTE_GRAVE";
  return "GRAVE";
}

export function gad7Level(score: number): RiskLevel {
  if (score <= 4) return "MINIMO";
  if (score <= 9) return "LEVE";
  if (score <= 14) return "MODERADO";
  return "GRAVE";
}
