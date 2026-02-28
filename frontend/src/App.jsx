import { useState, useEffect } from 'react';
import { Box, Image, ActionIcon, Container, Stack, Loader, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DayData } from './components/DayData';
import { Sidebar } from './components/Sidebar';
import classes from './App.module.css';

// Hamburger icon component
function HamburgerIcon({ opened }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.hamburgerIcon}
      data-opened={opened || undefined}
    >
      <path
        d="M4 6h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={classes.hamburgerLine1}
      />
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={classes.hamburgerLine2}
      />
      <path
        d="M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={classes.hamburgerLine3}
      />
    </svg>
  );
}

function App() {
  const [sidebarOpened, { open: openSidebar, close: closeSidebar }] = useDisclosure(false);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load calendar data
    fetch('/calendar.json')
      .then((res) => res.json())
      .then((data) => {
        setCalendarData(data);
        
        // Find today's date entry
        const today = new Date();
        const dayStr = String(today.getDate()).padStart(2, '0');
        const monthStr = String(today.getMonth() + 1).padStart(2, '0');
        const todayKey = `${dayStr}-${monthStr}`;
        
        const todayEntry = data.find((entry) => entry.day === todayKey);
        setSelectedDay(todayEntry || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading calendar data:', err);
        setLoading(false);
      });
  }, []);

  const handleSelectDay = (dayData) => {
    setSelectedDay(dayData);
  };

  if (loading) {
    return (
      <Box className={classes.wrapper}>
        <Center h="100vh">
          <Loader color="orange" size="xl" type="dots" />
        </Center>
      </Box>
    );
  }

  return (
    <Box className={classes.wrapper}>
      {/* Background effects */}
      <Box className={classes.bgGlow1} />
      <Box className={classes.bgGlow2} />
      <Box className={classes.bgStars} />

      {/* Hamburger Button */}
      <ActionIcon
        variant="subtle"
        color="orange"
        size="xl"
        className={classes.hamburgerButton}
        onClick={openSidebar}
        aria-label="Abrir menú"
      >
        <HamburgerIcon opened={sidebarOpened} />
      </ActionIcon>

      {/* Sidebar */}
      <Sidebar
        opened={sidebarOpened}
        onClose={closeSidebar}
        days={calendarData}
        onSelectDay={handleSelectDay}
        selectedDay={selectedDay}
      />

      {/* Main Content */}
      <Container size="lg" className={classes.mainContainer}>
        <Stack align="center" gap="xl" className={classes.contentStack}>
          {/* Dragon Ball Logo */}
          <Box className={classes.logoContainer}>
            <Image
              src="/images/logo.png"
              alt="Dragon Ball"
              className={classes.logo}
              fit="contain"
            />
            <Box className={classes.logoGlow} />
          </Box>

          {/* Day Content */}
          <DayData dayData={selectedDay} />
        </Stack>
      </Container>

      {/* Footer subtle text */}
      <Box className={classes.footer}>
        Un día a la vez en el mundo de Dragon Ball
      </Box>
    </Box>
  );
}

export default App;
