import { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCole] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <CheckOutSteps step1={true} step2={true} />
        <Heading as="h1" mb="8" fontSize="3xl">
          Shipping
        </Heading>
        <form onSubmit={submitHandler}>
          {/* Address */}
          <FormControl id="Address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          {/* ends */}
          <Spacer h="3" />
          {/* City */}
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              value={city}
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          {/* ends */}
          <Spacer h="3" />
          {/* postal code */}
          <FormControl id="postalCode" isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input
              placeholder="Enter Postal Code"
              type="number"
              value={postalCode}
              onChange={(e) => setPostalCole(e.target.value)}
            />
          </FormControl>
          {/* ends */}
          <Spacer h="3" />
          {/* Country */}
          <FormControl isRequired id="country">
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          {/* ends */}
          <Button type="submit" mt="4" colorScheme="teal">
            Save
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default ShippingScreen;
