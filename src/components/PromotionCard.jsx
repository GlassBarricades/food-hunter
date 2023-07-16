import { createStyles, Paper, Text, Title, Button, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(540),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.yellow,
    textShadow: "1px 1px 2px black",
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const PromotionCard = ({ image, title, category, day, getWeekDay }) => {
  const { classes } = useStyles();
  console.log(getWeekDay)
  return (
    <Paper
      shadow="md"
      p="xl"
      radius={day === getWeekDay? "xl" : "xs"}
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Подробнее
      </Button>
    </Paper>
  );
}
export default PromotionCard;