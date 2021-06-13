import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Heading,
  Link,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HiShoppingBag, HiUser, HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { logout } from '../actions/userActions';

const MenuItems = ({ children, url }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      mt={{ base: 4, md: 0 }}
      fontSize="sm"
      color="whiteAlpha.800"
      letterSpacing="wide"
      textTransform="uppercase"
      _hover={{ color: 'whiteAlpha.800' }}
      mr="5"
      display="block"
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="gray.800"
      shadow="md"
      w="100%"
      top="0"
      pos="fixed"
      zIndex="2"
    >
      <Flex align="center" mr="5">
        <Heading
          as="h1"
          color="whiteAlpha.800"
          fontWeight="medium"
          size="md"
          letterSpacing="wider"
          mr={{ md: '1rem', base: 0 }}
        >
          <Link
            as={RouterLink}
            to="/"
            _hover={{ color: 'whiteAlpha.700', textDecor: 'none' }}
          >
            Shoppzvilla
          </Link>
        </Heading>
      </Flex>

      <Box
        onClick={() => setShow(!show)}
        display={{ base: 'block', md: 'none', sm: 'block' }}
      >
        <Icon as={HiOutlineMenuAlt3} color="white" w="6" h="6" />
        <title>Menu</title>
      </Box>

      <Box
        align="center"
        width={{ sm: 'full', md: 'auto' }}
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
      >
        <MenuItems url="/cart">
          <Flex alignItems="center" _hover={{ opacity: '0.7' }}>
            <Icon
              as={HiShoppingBag}
              w="4"
              h="4"
              mr="1"
              color="whiteAlpha.800"
            />
            Cart
          </Flex>
        </MenuItems>

        {userInfo ? (
          <Menu>
            <MenuButton
              as={Link}
              color="whiteAlpha.800"
              fontSize="sm"
              fontWeight="semibold"
              // textTransform="uppercase"
              _hover={{ textDecoration: 'none', opacity: '0.7' }}
            >
              {userInfo.name}
              <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <MenuItems url="/login">
            <Flex alignItems="center" _hover={{ opacity: '0.7' }}>
              <Icon as={HiUser} w="4" h="4" mr="1" />
              Login
            </Flex>
          </MenuItems>
        )}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton
              as={Link}
              color="whiteAlpha.800"
              fontSize="sm"
              fontWeight="semibold"
              // textTransform="uppercase"
              paddingLeft="4"
              _hover={{ textDecoration: 'none', opacity: '0.7' }}
            >
              Manage <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/admin/userslist">
                All Users
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/productslist">
                All Products
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/orderslist">
                All Orders
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
