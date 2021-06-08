import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  Box,
  Grid,
  Text,
  Image,
  Link,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckOutSteps from '../components/CheckOutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Price Calculated Here
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, currItem) => acc + currItem.price * (currItem.qty || 1),
    0
  );
  cart.shippingPrice = cart.itemsPrice > 1000 ? 1000 : 0;
  cart.taxPrice = Number((12 * cart.itemsPrice) / 100);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  return (
    <Flex w="full" py="5" direction="column">
      <CheckOutSteps step1 step2 step3 step4 />
      <Grid templateColumns="3fr 2fr" gap="20">
        <Flex direction="column">
          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Shipping
            </Heading>
            <Text>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Text>
          </Box>

          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Payment Method
            </Heading>
            <Text>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </Text>
          </Box>

          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Order Items
            </Heading>
            <Text>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <Box py="2">
                  {cart.cartItems.map((item, index) => (
                    <Flex
                      key={index}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex py="2" alignItems="center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="12"
                          h="12"
                          objectFit="cover"
                          mr="6"
                        />
                        <Link as={RouterLink} to={`/product/${item.product}`}>
                          <Text fontWeight="medium" fontSize="xl">
                            {item.name}
                          </Text>
                        </Link>
                      </Flex>
                      <Text fontSize="lg" fontWeight="semibold">
                        {item.qty || 1} x ₹{item.price} = ₹
                        {(item.qty || 1) * item.price}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              )}
            </Text>
          </Box>
        </Flex>

        <Flex
          direction="column"
          bgColor="white"
          justifyContent="space-between"
          py="8"
          px="8"
          shadow="md"
          rounded="lg"
          borderColor="gray.300"
        >
          <Box>
            <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
              Order Summary
            </Heading>
            {/* Item prices */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Items</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.itemsPrice}
              </Text>
            </Flex>
            {/* Shipping price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Shipping</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.shippingPrice}
              </Text>
            </Flex>
            {/* Tax price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Tax</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.taxPrice}
              </Text>
            </Flex>
            {/* Total price */}
            <Flex py="2" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl">Total</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.totalPrice}
              </Text>
            </Flex>
          </Box>
          <Button
            size="lg"
            textTransform="uppercase"
            colorScheme="yellow"
            type="button"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default PlaceOrderScreen;
