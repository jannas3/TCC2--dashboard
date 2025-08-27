export type RiskLevel = 'MINIMO'|'LEVE'|'MODERADO'|'MODERADAMENTE_GRAVE'|'GRAVE';

export interface Screening {
  id: string;
  createdAt: string;
  phq9Score: number;
  gad7Score: number;
  riskPHQ9: RiskLevel;
  riskGAD7: RiskLevel;
  disponibilidade: string;
  observacao: string | null;
  relatorio: string;
  student: {
    nome: string;
    matricula: string;
    curso: string;
    periodo: string;
    telegramId?: string | null; // opcional (vem do include do student)
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function getScreenings(limit = 50): Promise<Screening[]> {
  const res = await fetch(`${BASE_URL}/api/screenings?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Falha ao carregar triagens");
  return res.json();
}
