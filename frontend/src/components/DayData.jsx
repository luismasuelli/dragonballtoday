import { Box, Text, Title, Image, Stack, Group, Badge, Paper, Button } from '@mantine/core';
import classes from './DayData.module.css';

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function formatDay(day) {
  const [dayNum, monthNum] = day.split('-');
  return `${parseInt(dayNum)} de ${monthNames[parseInt(monthNum) - 1]}`;
}

export function DayData({ dayData, upcomingDay, onSelectUpcoming }) {
  if (!dayData) {
    return (
      <Paper className={classes.container} p="xl" radius="lg">
        <Stack align="center" gap="lg">
          <Title order={2} className={classes.noDataTitle}>
            No hay evento para hoy
          </Title>
          <Text className={classes.noDataText}>
            Explora el calendario para ver otros días importantes en la historia de Dragon Ball.
          </Text>
          {upcomingDay && (
            <Stack align="center" gap="sm" mt="md">
              <Text className={classes.upcomingLabel}>Próximo evento:</Text>
              <Button
                variant="light"
                color="orange"
                size="md"
                onClick={() => onSelectUpcoming?.(upcomingDay)}
                className={classes.upcomingButton}
              >
                {formatDay(upcomingDay.day)} — {upcomingDay.title}
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>
    );
  }

  const { day, title, year, description, type } = dayData;
  const formattedDay = formatDay(day);
  const imagePath = `/images/${day}.png`;

  return (
    <Paper className={classes.container} p={{ base: 'md', sm: 'xl' }} radius="lg">
      <Stack gap="lg">
        {/* Day Badge */}
        <Box className={classes.dayBadgeContainer}>
          <Badge 
            size="xl" 
            variant="gradient" 
            gradient={{ from: 'orange.6', to: 'yellow.5', deg: 135 }}
            className={classes.dayBadge}
          >
            {formattedDay}
          </Badge>
        </Box>

        {/* Content Grid: Year/Title/Description on left, Image on right */}
        <Group 
          align="flex-start" 
          justify="space-between" 
          wrap="nowrap"
          className={classes.contentGrid}
        >
          {/* Left Column: Year, Title, Description */}
          <Stack gap="md" className={classes.textContent}>
            <Group gap="xs" className={classes.yearContainer}>
              <Text className={classes.yearLabel}>Año original:</Text>
              <Text className={classes.year}>{year}</Text>
            </Group>

            <Title order={1} className={classes.title}>
              {title}
            </Title>

            <Text className={classes.description}>
              {description}
            </Text>

            {type && (
              <Badge 
                variant="light" 
                color="orange"
                size="md"
                className={classes.typeBadge}
              >
                {type === 'real-world' ? 'Mundo real' : type}
              </Badge>
            )}
          </Stack>

          {/* Right Column: Image */}
          <Box className={classes.imageContainer}>
            <Image
              src={imagePath}
              alt={title}
              radius="md"
              className={classes.image}
              fallbackSrc="/images/pngegg.png"
            />
          </Box>
        </Group>
      </Stack>
    </Paper>
  );
}
