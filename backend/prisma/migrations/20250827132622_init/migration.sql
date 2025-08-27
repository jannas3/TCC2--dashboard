-- CreateEnum
CREATE TYPE "public"."RiskLevel" AS ENUM ('MINIMO', 'LEVE', 'MODERADO', 'MODERADAMENTE_GRAVE', 'GRAVE');

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "matricula" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Screening" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "phq9Respostas" INTEGER[],
    "phq9Score" INTEGER NOT NULL,
    "gad7Respostas" INTEGER[],
    "gad7Score" INTEGER NOT NULL,
    "disponibilidade" TEXT NOT NULL,
    "observacao" TEXT,
    "relatorio" TEXT NOT NULL,
    "riskPHQ9" "public"."RiskLevel" NOT NULL,
    "riskGAD7" "public"."RiskLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_matricula_key" ON "public"."Student"("matricula");

-- AddForeignKey
ALTER TABLE "public"."Screening" ADD CONSTRAINT "Screening_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
