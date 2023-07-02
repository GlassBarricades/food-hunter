import { createStyles, ThemeIcon, Text, SimpleGrid, Box, Stack } from '@mantine/core';
import { Sun, Phone, MapPin, At } from 'tabler-icons-react';


const useStyles = createStyles((theme, { variant }) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colorScheme === "dark"
    ? theme.colors.yellow[6]
    : theme.black,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === 'gradient'
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : 'none',
    backgroundColor: 'transparent',
  },

  title: {
    color: theme.colorScheme === "dark"
    ? theme.white
    : theme.black,
  },

  description: {
    color: theme.colorScheme === "dark"
    ? theme.colors.yellow[6]
    : theme.black,
  },
}));


function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = 'gradient',
  className,
  ...others
}) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === 'gradient' ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size="1.5rem" />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size="1.5rem" />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'food-hunter.by@mail.ru', icon: At },
  { title: 'Телефон', description: '+375(29)666-93-99', icon: Phone },
  { title: 'Адрес', description: 'Проспект Ленина, д. 14Б', icon: MapPin },
  { title: 'Время работы', description: 'Вс-Чт: 11:00-23:00 Пт-Сб: 11:00-00:00', icon: Sun },
];

export function ContactIconsList({ data = MOCKDATA, variant }) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack>{items}</Stack>;
}

export function ContactIcons() {
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <ContactIconsList />
      </Box>

      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundImage: `linear-gradient(135deg, ${theme.colors[theme.primaryColor][6]} 0%, ${
            theme.colors[theme.primaryColor][4]
          } 100%)`,
        })}
      >
        <ContactIconsList variant="white" />
      </Box>
    </SimpleGrid>
  );
}