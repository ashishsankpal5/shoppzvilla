import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Text,
  Grid,
  Heading,
  Box,
  Image,
  Link,
  Select,
  Button,
  Icon,
  Alert,
} from '@chakra-ui/react';
import { IoTrashBinSharp } from 'react-icons/io5';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
// import e from 'express';

const CartScreen = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = (id) => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Grid gridTemplateColumns="3">
      <Box>
        <Heading fontSize="3xl" mb="6">
          Shopping Cart
        </Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty.{' '}
              <Link as={RouterLink} to="/" _hover={{ bgColor: 'blue.500' }}>
                Go Back
              </Link>
            </Message>
          ) : (
            <Grid templateColumns="3fr 2fr" gap="10 " w="full">
              <Flex direction="column">
                {cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    size="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px"
                    borderColor="gray.200"
                    py="2"
                    templateColumns="1fr 4fr 2fr 2fr 1fr"
                    px="6"
                    _hover={{ bgColor: 'gray.300' }}
                    borderRadius="full"
                    // border="2px solid black"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      borderRadius="lg"
                      height="14"
                      width="14"
                      objectFit="cover"
                    />
                    <Text fontWeight="semibold" fontSize="lg">
                      <Link as={RouterLink} to={`/products/${item.product}`}>
                        {item.name}
                      </Link>
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      ₹{item.price}
                    </Text>
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                      width="20"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Icon as={IoTrashBinSharp} />
                    </Button>
                  </Grid>
                ))}
              </Flex>
              <Flex
                direction="column"
                border="1px"
                borderWidth="2"
                borderColor="gray.200"
                rounded="md"
                padding="5"
                height="48"
                justifyContent="space-between"
              >
                <Flex direction="column" alignItems="center">
                  <Heading as="h2" fontSize="3xl">
                    Subtotal Items: (
                    {cartItems.reduce((acc, curItem) => acc + curItem.qty, 0)})
                  </Heading>
                  <Text fontWeight="bold" fontSize="2xl" color="blue.600">
                    ₹
                    {cartItems.reduce(
                      (acc, currItem) => acc + currItem.qty * currItem.price,
                      0
                    )}
                  </Text>
                </Flex>
                <Button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                  size="lg"
                  colorScheme="teal"
                  bgColor="gray.800"
                  borderRadius="full"
                >
                  Proceed To CheckOutt
                </Button>
              </Flex>
            </Grid>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default CartScreen;
