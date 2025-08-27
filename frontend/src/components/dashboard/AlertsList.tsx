import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Chip, SvgIcon } from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { AlertItem } from '../../data/mock';

interface AlertsListProps {
  data: AlertItem[];
}

export const AlertsList = (props: AlertsListProps) => {
  const { data } = props;

  return (
    <Card>
      <CardHeader title="Painel de Alertas" />
      <CardContent>
        <List>
          {data.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {item.student} - {item.instrument} ({item.score})
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Nível: <Chip label={item.level} size="small" color="error" /> - Data: {item.date}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

