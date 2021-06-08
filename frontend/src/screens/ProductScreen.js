import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  // Container,
  Divider,
  Select,
  Icon,
  // Tag,
} from '@chakra-ui/react';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const addToCartHandller = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" colorScheme="black" variant="ghost">
          <Icon as={IoArrowBackOutline} fontSize="4xl" />
        </Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid templateColumns="3fr 4fr 2fr" gap="10">
          <Image src={product.image} alt={product.name} borderRadius="md" />
          <Flex direction="column">
            <Heading as="h6" fontSize="base" color="gray.500">
              {product.brand}
            </Heading>
            <Heading as="h2" fontSize="4xl" mb="5">
              {product.name}
            </Heading>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              alignment="single"
            />
            <Heading
              as="h5"
              fontSize="3xl"
              fontWeight="medium"
              color="teal.600"
              mt="5"
              mb="5"
            >
              ₹{product.price}
            </Heading>
            <Text color="gray.500">{product.description}</Text>
          </Flex>
          <Flex direction="column">
            <Flex justifyContent="space-between" py="2">
              <Text>Price:</Text>
              <Text fontWeight="bold">₹{product.price}</Text>
            </Flex>
            <Divider />
            <Flex justifyContent="space-between" py="2">
              <Text>Status:</Text>
              <Text fontWeight="bold">
                {product.countInStock > 0 ? 'In Stock' : 'Not Available'}
              </Text>
            </Flex>
            <Divider />
            {/* Quantity section */}
            {product.countInStock > 0 && (
              <Flex justifyContent="space-between" py="2">
                <Text>Qty: </Text>
                <Select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  width="30%"
                >
                  {[...Array(product.countInStock).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Select>
              </Flex>
            )}
            {/* ends */}
            <Divider />
            <Button
              onClick={addToCartHandller}
              bgColor="gray.800"
              textTransform="uppercase"
              letterSpacing="wider"
              colorScheme="teal"
              my="2"
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </Button>
          </Flex>
        </Grid>
      )}
    </>
  );
};

export default ProductScreen;
