import { Spinner, Flex } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Flex
      minHeight="calc(100vh - 172px)"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner thickness="4px" size="xl" label="Loading..." />
    </Flex>
  );
};

export default Loader;
