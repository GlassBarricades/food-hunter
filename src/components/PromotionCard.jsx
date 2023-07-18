import { createStyles, Paper, Text, Title, Button, rem, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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

const PromotionCard = ({ image, title, category, day, description}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
 
  return (
    <>
    <Modal opened={opened} onClose={close} title={title} centered>
      {description}
    </Modal>
    <Paper
      shadow="md"
      p="xl"
      mb="md"
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
      <Button variant="white" color="dark" onClick={open}>
        Подробнее
      </Button>
    </Paper>
    </>
  );
}
export default PromotionCard;