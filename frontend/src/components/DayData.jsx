import { Box, Text, Title, Image, Stack, Group, Badge, Paper } from '@mantine/core';
import classes from './DayData.module.css';

export function DayData({ dayData }) {
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
        </Stack>
      </Paper>
    );
  }

  const { day, title, year, description, type } = dayData;
  const [dayNum, monthNum] = day.split('-');
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const formattedDay = `${parseInt(dayNum)} de ${monthNames[parseInt(monthNum) - 1]}`;
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
            <Box className={classes.yearContainer}>
              <Text className={classes.yearLabel}>Año original</Text>
              <Text className={classes.year}>{year}</Text>
            </Box>

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
