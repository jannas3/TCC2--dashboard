import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Chip, SvgIcon } from '@mui/material';
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon';
import { AlertItem } from '../../../data/mock';

interface AlertsListProps {
  items: AlertItem[];
}

export const AlertsList = (props: AlertsListProps) => {
  const { items } = props;

  return (
    <Card>
      <CardHeader
        title="Painel de Alertas"
        avatar={
          <Avatar sx={{ color: 'error.main', bgcolor: 'transparent' }}>
            <SvgIcon>
              <ExclamationTriangleIcon />
            </SvgIcon>
          </Avatar>
        }
      />
      <CardContent>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {item.aluno} - {item.instrumento} ({item.escore})
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Nível: <Chip label={item.nivel} size="small" color="error" /> - Data: {item.data}
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

