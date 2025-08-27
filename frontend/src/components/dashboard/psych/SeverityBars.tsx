import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { SeverityData } from '../../../data/mock';

interface SeverityBarsProps {
  data: SeverityData[];
}

export const SeverityBars = (props: SeverityBarsProps) => {
  const { data } = props;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Distribuição PHQ-9 e GAD-7" />
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="level" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
              }}
              itemStyle={{ color: theme.palette.text.primary }}
            />
            <Legend />
            <Bar dataKey="phq9" fill={theme.palette.primary.main} name="PHQ-9" />
            <Bar dataKey="gad7" fill={theme.palette.secondary.main} name="GAD-7" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

