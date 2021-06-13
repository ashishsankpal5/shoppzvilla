import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Grid,
  Table,
  Thead,
  Tbody,
  Icon,
  Link,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react';
import { IoWarning } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // check if passwords are equal
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  return (
    <Grid gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr' }} py="5" gap="10">
      <Flex
        bgColor="white"
        boxShadow="md"
        rounded="md"
        p="10"
        direction="column"
      >
        <Heading as="h2" mb="8" fontSize="3xl">
          User Profile
        </Heading>
        {message && <Message type="error">{message}</Message>}
        {error && <Message type="error">{error}</Message>}
        {success && <Message type="success">Profile Updated!</Message>}
        <form onSubmit={submitHandler}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password Again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button isLoading={loading} type="submit" mt="4" colorScheme="teal">
            Update
          </Button>
        </form>
      </Flex>
      <Flex direction="column">
        <Heading as="h2" mb="8">
          My Orders
        </Heading>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error">{errorOrders}</Message>
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>{order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}
                  </Td>
                  <Td>
                    <Link as={RouterLink} to={`/order/${order._id}`}>
                      <Button colorScheme="teal" size="sm">
                        Details
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Grid>
  );
};

export default ProfileScreen;
