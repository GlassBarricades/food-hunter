import { Paper, Text, Title, Button, rem, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './PromotionCard.module.css';

const PromotionCard = ({ image, title, category, day, description }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {description}
      </Modal>
      <Paper
        shadow="md"
        p="xl"
        mb="md"
        styles={{
          root: {
            backgroundImage: `url(${image})`
          }
        }}
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
        <Button variant='default' onClick={open}>
          Подробнее
        </Button>
      </Paper>
    </>
  );
}
export default PromotionCard;