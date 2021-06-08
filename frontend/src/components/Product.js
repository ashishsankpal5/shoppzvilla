import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Link,
  Image,
  Flex,
  Heading,
  Text,
  // Fade,
  // ScaleFade,
  // Slide,
  // SlideFade,
} from '@chakra-ui/react';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        maxW="sm"
        borderRadius="lg"
        // border="1px solid gray"
        bgColor="white"
        overflow="hidden"
        transition="all"
        _hover={{ shadow: 'md' }}
        // color="whiteAlpha.800"
        boxShadow="xl"
      >
        <Image
          src={product.image}
          alt={product.name}
          minH="360px"
          objectFit="cover"
        />
        <Flex
          y="5"
          px="4"
          direction="column"
          justifyContent="space-between"
          h="36"
          // border="2px solid red"
          _hover={{
            bgColor: 'gray.800',
            colorScheme: 'teal',
            color: 'whiteAlpha.800',
          }}
          pt="4"
        >
          <Heading as="h4" fontSize="lg" mb="3">
            {product.name}
          </Heading>
          <Flex
            alignItems="flex-end"
            justifyContent="space-between"
            // border="2px solid red"
            pb="2"
          >
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="red"
            />
            <Text fontSize="xl" fontWeight="medium" color="blue.600">
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Product;
