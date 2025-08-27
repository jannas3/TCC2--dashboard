import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Chip } from '@mui/material';
import { AgendaItem } from '../../../data/mock';

interface AgendaListProps {
  items: AgendaItem[];
}

export const AgendaList = (props: AgendaListProps) => {
  const { items } = props;

  return (
    <Card>
      <CardHeader title="Agenda Rápida" />
      <CardContent>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={<Typography variant="subtitle1">{item.aluno} - {item.horario}</Typography>}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Modalidade: {item.modalidade} - Status: <Chip label={item.status} size="small" />
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

