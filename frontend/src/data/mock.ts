export type KpiData = {
  attendedStudents: number;
  scheduledSessions: number;
  casesInProgress: number;
  atRiskStudents: number;
};

export type SessionEvolutionData = {
  month: string;
  sessions: number;
};

export type SeverityData = {
  level: string;
  phq9: number;
  gad7: number;
};

export type ReferralData = {
  name: string;
  value: number;
};

export type AgendaItem = {
  aluno: string;
  horario: string;
  modalidade: string;
  status: string;
};

export type AlertItem = {
  aluno: string;
  instrumento: 'PHQ-9' | 'GAD-7';
  escore: number;
  nivel: 'Leve' | 'Moderado' | 'Grave';
  data: string;
};

export const mockKpiData: KpiData = {
  attendedStudents: 250,
  scheduledSessions: 32,
  casesInProgress: 18,
  atRiskStudents: 7,
};

export const mockSessionEvolution: SessionEvolutionData[] = [
  { month: 'Jan', sessions: 200 },
  { month: 'Feb', sessions: 220 },
  { month: 'Mar', sessions: 210 },
  { month: 'Apr', sessions: 230 },
  { month: 'May', sessions: 250 },
  { month: 'Jun', sessions: 240 },
];

export const mockPhq9Gad7Data: SeverityData[] = [
  { level: 'Leve', phq9: 40, gad7: 35 },
  { level: 'Moderado', phq9: 25, gad7: 20 },
  { level: 'Grave', phq9: 10, gad7: 8 },
];

export const mockReferralSources: ReferralData[] = [
  { name: 'Autoencaminhamento', value: 20 },
  { name: 'Professores', value: 60 },
  { name: 'Coordenação', value: 20 },
];

export const mockAgenda: AgendaItem[] = [
  { aluno: 'João Silva', horario: '10:00', modalidade: 'presencial', status: 'Confirmada' },
  { aluno: 'Maria Souza', horario: '11:30', modality: 'online', status: 'Pendente' },
  { aluno: 'Pedro Santos', horario: '14:00', modalidade: 'presencial', status: 'Confirmada' },
  { aluno: 'Ana Paula', horario: '15:30', modality: 'online', status: 'Remarcada' },
];

export const mockAlerts: AlertItem[] = [
  { aluno: 'Lucas Mendes', instrumento: 'PHQ-9', escore: 22, nivel: 'Grave', data: '2023-10-26' },
  { aluno: 'Beatriz Costa', instrumento: 'GAD-7', escore: 18, nivel: 'Moderado', data: '2023-10-25' },
  { aluno: 'Carlos Lima', instrumento: 'PHQ-9', escore: 20, nivel: 'Grave', data: '2023-10-24' },
];
