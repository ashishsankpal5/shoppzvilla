import { Flex, Text, Link, Icon, Button, Box } from '@chakra-ui/react';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoYoutube,
} from 'react-icons/io5';

const Footer = () => {
  return (
    <>
      <Flex
        as="footer"
        justifyContent="space-between"
        py="5"
        bgColor="gray.800"
      >
        <Text color="whiteAlpha.800" fontSize="small" ml="6">
          © 2021 Routing Switching Tigers Pvt. Ltd. All Rights Reserved™
        </Text>

        <Flex>
          <Text color="whiteAlpha.800" fontSize="small" ml="6" mt="1">
            Follow Us
          </Text>
          <Box ml="6" mr="6">
            <Link href="https://www.facebook.com/RSTForum" isExternal>
              <Icon
                as={IoLogoFacebook}
                color="whiteAlpha.800"
                ml="2"
                mr="2"
                _hover={{ opacity: '0.7' }}
              />
            </Link>
            <Link href="https://twitter.com/rstforumindia" isExternal>
              <Icon
                as={IoLogoTwitter}
                color="whiteAlpha.800"
                ml="2"
                mr="2"
                _hover={{ opacity: '0.7' }}
              />
            </Link>
            <Link href="https://twitter.com/rstforumindia" isExternal>
              <Icon
                as={IoLogoLinkedin}
                color="whiteAlpha.800"
                ml="2"
                mr="2"
                _hover={{ opacity: '0.7' }}
              />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCn6bQmGTlgf5FonOrUAA_wA"
              isExternal
            >
              <Icon
                as={IoLogoYoutube}
                color="whiteAlpha.800"
                ml="2"
                mr="2"
                _hover={{ opacity: '0.7' }}
              />
            </Link>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
export default Footer;
