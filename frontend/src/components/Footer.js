import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <>
      <Flex
        as="footer"
        justifyContent="center"
        alignItems="center"
        py="5"
        bgColor="gray.800"
      >
        <Text color="whiteAlpha.800" fontSize="small" ml="6">
          © 2021 Routing Switching Tigers Pvt. Ltd. All Rights Reserved™
        </Text>
      </Flex>
    </>
  );
};
export default Footer;
