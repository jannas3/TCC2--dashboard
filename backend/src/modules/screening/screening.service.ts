import { prisma } from "../../db/prisma.js";
import { ScreeningDTO } from "./screening.validators.js";
import { phq9Level, gad7Level } from "../../utils/risk.js";

/**
 * Cria (ou atualiza aluno) e registra a triagem.
 * Recalcula os escores no servidor e determina os níveis de risco.
 * Retorna um objeto enxuto para o chamador (id/createdAt/níveis).
 */
export async function createScreening(data: ScreeningDTO) {
  // Normalização defensiva
  const nome = data.nome.trim();
  const curso = data.curso.trim();
  const periodo = data.periodo.trim();
  const idade = Number.isFinite(data.idade) ? data.idade : 0;
  const observacao = (data.observacao ?? "").trim() || null;

  // Recalcular no servidor por segurança
  const phq9ScoreSrv = data.phq9_respostas.reduce((a, b) => a + b, 0);
  const gad7ScoreSrv = data.gad7_respostas.reduce((a, b) => a + b, 0);

  const riskPHQ9 = phq9Level(phq9ScoreSrv);
  const riskGAD7 = gad7Level(gad7ScoreSrv);

  // Atomicidade: upsert do aluno + create da triagem
  const screening = await prisma.$transaction(async (tx) => {
    const student = await tx.student.upsert({
      where: { matricula: data.matricula },
      update: {
        telegramId: data.telegram_id || undefined,
        nome,
        idade,
        curso,
        periodo,
      },
      create: {
        telegramId: data.telegram_id || null,
        nome,
        idade,
        matricula: data.matricula,
        curso,
        periodo,
      },
    });

    return tx.screening.create({
      data: {
        studentId: student.id,
        phq9Respostas: data.phq9_respostas,
        phq9Score: phq9ScoreSrv,
        gad7Respostas: data.gad7_respostas,
        gad7Score: gad7ScoreSrv,
        disponibilidade: data.disponibilidade,
        observacao,
        relatorio: data.relatorio,
        riskPHQ9,
        riskGAD7,
      },
    });
  });

  return {
    id: screening.id,
    createdAt: screening.createdAt,
    riskPHQ9: screening.riskPHQ9,
    riskGAD7: screening.riskGAD7,
  };
}

/**
 * Lista triagens recentes com dados básicos do aluno.
 */
export async function listScreenings(limit = 20) {
  return prisma.screening.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      student: {
        select: { nome: true, matricula: true, curso: true, periodo: true },
      },
    },
  });
}
