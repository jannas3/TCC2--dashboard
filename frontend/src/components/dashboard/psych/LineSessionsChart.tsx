import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SessionEvolutionData } from '../../../data/mock';

interface LineSessionsChartProps {
  data: SessionEvolutionData[];
}

export const LineSessionsChart = (props: LineSessionsChartProps) => {
  const { data } = props;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Evolução dos Atendimentos" />
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
              }}
              itemStyle={{ color: theme.palette.text.primary }}
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke={theme.palette.primary.main}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

