import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { KpiCard } from 'src/components/dashboard/KpiCard';
import { LineSessionsChart } from 'src/components/dashboard/LineSessionsChart';
import { SeverityBars } from 'src/components/dashboard/SeverityBars';
import { ReferralsDonut } from 'src/components/dashboard/ReferralsDonut';
import { AgendaList } from 'src/components/dashboard/AgendaList';
import { AlertsList } from 'src/components/dashboard/AlertsList';
import { mockKpiData, mockSessionEvolution, mockPhq9Data, mockGad7Data, mockReferralSources, mockAgenda, mockAlerts } from 'src/data/mock';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import CalendarDaysIcon from '@heroicons/react/24/solid/CalendarDaysIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon';

const Page = () => (
  <>
    <Head>
      <title>
        Dashboard | Devias Kit
      </title>
    </Head>
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
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <KpiCard
              title="Alunos Atendidos"
              value={mockKpiData.attendedStudents.toString()}
              icon={UsersIcon}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <KpiCard
              title="Sessões Agendadas"
              value={mockKpiData.scheduledSessions.toString()}
              icon={CalendarDaysIcon}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <KpiCard
              title="Casos em Acompanhamento"
              value={mockKpiData.casesInProgress.toString()}
              icon={ArrowDownIcon}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <KpiCard
              title="Alunos em Risco"
              value={mockKpiData.atRiskStudents.toString()}
              icon={ExclamationTriangleIcon}
            />
          </Grid>

          <Grid
            xs={12}
            lg={8}
          >
            <LineSessionsChart
              data={mockSessionEvolution}
            />
          </Grid>
          <Grid
            xs={12}
            lg={4}
          >
            <AgendaList
              data={mockAgenda}
            />
          </Grid>
          <Grid
            xs={12}
            lg={6}
          >
            <SeverityBars
              title="Distribuição PHQ-9"
              data={mockPhq9Data}
            />
          </Grid>
          <Grid
            xs={12}
            lg={6}
          >
            <SeverityBars
              title="Distribuição GAD-7"
              data={mockGad7Data}
            />
          </Grid>
          <Grid
            xs={12}
            lg={6}
          >
            <ReferralsDonut
              data={mockReferralSources}
            />
          </Grid>
          <Grid
            xs={12}
            lg={6}
          >
            <AlertsList
              data={mockAlerts}
            />
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
