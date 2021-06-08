import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { ReactReduxContext } from 'react-redux';

const Message = ({ type = 'info', children }) => {
  return (
    <Alert>
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default Message;
