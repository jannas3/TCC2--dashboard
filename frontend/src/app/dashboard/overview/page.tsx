import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';

import { Layout as DashboardLayout } from '@/app/dashboard/layout';
import { KpiCard } from '@/components/dashboard/psych/KpiCard';
import { LineSessionsChart } from '@/components/dashboard/psych/LineSessionsChart';
import { SeverityBars } from '@/components/dashboard/psych/SeverityBars';
import { ReferralsDonut } from '@/components/dashboard/psych/ReferralsDonut';
import { AgendaList } from '@/components/dashboard/psych/AgendaList';
import { AlertsList } from '@/components/dashboard/psych/AlertsList';
import { mockKpiData, mockSessionEvolution, mockPhq9Gad7Data, mockReferralSources, mockAgenda, mockAlerts } from '@/data/mock';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import CalendarDaysIcon from '@heroicons/react/24/solid/CalendarDaysIcon';
import HandRaisedIcon from '@heroicons/react/24/solid/HandRaisedIcon'; // for Casos em acompanhamento
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon'; // for Alunos em risco
import dayjs from 'dayjs';

const Page = () => (
  <>
    <Helmet>
      <title>
        Dashboard Psicologia | IFAM
      </title>
    </Helmet>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          {/* Row 1: KPI Cards */}
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="Alunos Atendidos"
              value={mockKpiData.attendedStudents}
              icon={UsersIcon}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="Sessões Agendadas"
              value={mockKpiData.scheduledSessions}
              icon={CalendarDaysIcon}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="Casos em Acompanhamento"
              value={mockKpiData.casesInProgress}
              icon={HandRaisedIcon}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="Alunos em Risco"
              value={mockKpiData.atRiskStudents}
              icon={ExclamationTriangleIcon}
            />
          </Grid>

          {/* Row 2: Line Chart and Donut Chart */}
          <Grid xs={12} md={8}>
            <LineSessionsChart data={mockSessionEvolution} />
          </Grid>
          <Grid xs={12} md={4}>
            <ReferralsDonut data={mockReferralSources} />
          </Grid>

          {/* Row 3: Bar Chart and Agenda List */}
          <Grid xs={12} md={7}>
            <SeverityBars data={mockPhq9Gad7Data} />
          </Grid>
          <Grid xs={12} md={5}>
            <AgendaList items={mockAgenda} />
          </Grid>

          {/* Row 4: Alerts List */}
          <Grid xs={12}>
            <AlertsList items={mockAlerts} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

