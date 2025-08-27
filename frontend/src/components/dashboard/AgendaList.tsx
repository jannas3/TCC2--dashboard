import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Chip } from '@mui/material';
import { AgendaItem } from '../../data/mock';

interface AgendaListProps {
  data: AgendaItem[];
}

export const AgendaList = (props: AgendaListProps) => {
  const { data } = props;

  return (
    <Card>
      <CardHeader title="Agenda Rápida" />
      <CardContent>
        <List>
          {data.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={<Typography variant="subtitle1">{item.student} - {item.time}</Typography>}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Modalidade: {item.modality} - Status: <Chip label={item.status} size="small" />
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

