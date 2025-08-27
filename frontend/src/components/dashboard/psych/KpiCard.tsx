import type { SvgIconProps } from '@mui/material/SvgIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

interface KpiCardProps {
  value: number | string;
  title: string;
  icon?: React.ElementType<SvgIconProps>;
  suffix?: string;
}

export const KpiCard = (props: KpiCardProps) => {
  const { value, title, icon: Icon, suffix } = props;

  return (
    <Card>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {title}
            </Typography>
            <Typography variant="h4">
              {value}{suffix}
            </Typography>
          </Stack>
          {Icon && (
            <Avatar
              sx={{
                backgroundColor: 'grey.300',
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <Icon />
              </SvgIcon>
            </Avatar>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

