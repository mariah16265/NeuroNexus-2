import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.jpg';
import { Badge, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Store.js';
import cartpic from './cartpic.jpg';
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SigninScreen.js';
//JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.
function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    //React Router DOM makes it easy to create single-page applications (SPAs) with multiple views or pages,
    //each represented by a unique URL. This helps improve the user experience by allowing users to navigate between different sections of the application
    //without requiring a full page refresh.
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
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
              <Nav className="ms-auto">
                <Link
                  to="/cart"
                  className="nav-link"
                  style={{ position: 'relative' }}
                >
                  <img
                    id="letstry"
                    src={cartpic}
                    alt="Logo"
                    width="50"
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
                        top: '45%',
                        left: '57%',
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
