import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Heading, Grid } from '@chakra-ui/react';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <Heading mb="8" as="h2" fontSize="3xl" textAlign="center">
        Latest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error"> {error}</Message>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap="8">
          {products.map((prod) => (
            <Product key={prod._id} product={prod} />
          ))}
        </Grid>
      )}
    </div>
  );
};
export default HomeScreen;
