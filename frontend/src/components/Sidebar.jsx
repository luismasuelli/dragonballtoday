import { Drawer, Stack, Text, UnstyledButton, Box, ScrollArea, Badge, Group } from '@mantine/core';
import classes from './Sidebar.module.css';

export function Sidebar({ opened, onClose, days, onSelectDay, selectedDay }) {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Group days by month
  const daysByMonth = days.reduce((acc, dayData) => {
    const [, monthNum] = dayData.day.split('-');
    const monthIndex = parseInt(monthNum) - 1;
    const monthName = monthNames[monthIndex];
    
    if (!acc[monthName]) {
      acc[monthName] = [];
    }
    acc[monthName].push(dayData);
    return acc;
  }, {});

  // Sort months by their index
  const sortedMonths = Object.keys(daysByMonth).sort((a, b) => {
    return monthNames.indexOf(a) - monthNames.indexOf(b);
  });

  const formatDayLabel = (day) => {
    const [dayNum] = day.split('-');
    return parseInt(dayNum);
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Text className={classes.drawerTitle}>
          Calendario Dragon Ball
        </Text>
      }
      size="sm"
      classNames={{
        content: classes.drawerContent,
        header: classes.drawerHeader,
        body: classes.drawerBody,
      }}
    >
      <ScrollArea h="calc(100vh - 80px)" scrollbarSize={6}>
        <Stack gap="lg" pb="xl">
          {sortedMonths.map((month) => (
            <Box key={month}>
              <Text className={classes.monthHeader}>{month}</Text>
              <Stack gap="xs" mt="sm">
                {daysByMonth[month]
                  .sort((a, b) => {
                    const dayA = parseInt(a.day.split('-')[0]);
                    const dayB = parseInt(b.day.split('-')[0]);
                    return dayA - dayB;
                  })
                  .map((dayData) => (
                    <UnstyledButton
                      key={dayData.day}
                      onClick={() => {
                        onSelectDay(dayData);
                        onClose();
                      }}
                      className={classes.dayButton}
                      data-selected={selectedDay?.day === dayData.day || undefined}
                    >
                      <Group gap="sm" wrap="nowrap">
                        <Badge 
                          className={classes.dayNumber}
                          variant={selectedDay?.day === dayData.day ? 'filled' : 'light'}
                          color="orange"
                          size="lg"
                        >
                          {formatDayLabel(dayData.day)}
                        </Badge>
                        <Box className={classes.dayInfo}>
                          <Text className={classes.dayTitle} lineClamp={1}>
                            {dayData.title}
                          </Text>
                          <Text className={classes.dayYear}>
                            {dayData.year}
                          </Text>
                        </Box>
                      </Group>
                    </UnstyledButton>
                  ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Drawer>
  );
}
