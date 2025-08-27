import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ReferralData } from '../../../data/mock';

interface ReferralsDonutProps {
  data: ReferralData[];
}

export const ReferralsDonut = (props: ReferralsDonutProps) => {
  const { data } = props;
  const theme = useTheme();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Example colors, can be adjusted to neutral tones if needed

  return (
    <Card>
      <CardHeader title="Fontes de Encaminhamento" />
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
              }}
              itemStyle={{ color: theme.palette.text.primary }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

