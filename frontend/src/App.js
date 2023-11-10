import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.jpg';
import lang from './lang.jpg';

import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Store.js';
import cartpic from './cartpic.jpg';
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import PaymentMethodScreen from './screens/PaymentMethodScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import OrderHistoryScreen from './screens/OrderHistoryScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SearchBox from './Components/SearchBox.js';
//JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    //React Router DOM makes it easy to create single-page applications (SPAs) with multiple views or pages,
    //each represented by a unique URL. This helps improve the user experience by allowing users to navigate between different sections of the application
    //without requiring a full page refresh.
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar style={{ backgroundColor: '#181c24' }} variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    src={logo} // Use the imported image
                    alt="Logo"
                    width="131.6"
                    height="50"
                    className="d-inline-block align-top"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <SearchBox />
              <Nav className="ms-auto">
                <img
                  id="new"
                  src={lang}
                  alt="Language"
                  width="67.38"
                  height="36"
                />
                {userInfo ? (
                  <NavDropdown
                    className="nav-line-1 nav-progressive-content me-4 custom-dropdown"
                    title={'Hello, ' + userInfo.name}
                    id="basic=nav-dropdown"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link id="pos" className="nav-link me-5" to="/signin">
                    Sign In{' '}
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="nav-link"
                  style={{ position: 'relative' }}
                >
                  <img
                    id="letstry"
                    src={cartpic}
                    alt="Logo"
                    width="90"
                    height="47"
                    className="d-inline-block align-middle"
                  />
                  {cart.cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="warning"
                      text="dark"
                      style={{
                        //allows you to place it anywhere within the container.
                        position: 'absolute',
                        //to position the badge's top-left corner at the center of the container.
                        top: '35%',
                        left: '37%',
                        //centers the badge within the container both vertically and horizontally.
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/products/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
