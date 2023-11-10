import React, { useContext, useEffect, useReducer } from 'react';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Store } from '../Store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../util';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

//The reducer function is responsible for managing the state updates based on different action types.
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    default:
      return { state };
  }
}

export default function OrderScreen() {
  //It uses the useContext hook to get the state from a context
  const { state } = useContext(Store);
  const { userInfo } = state;

  //It uses the useParams hook from React Router to get parameters from the URL.
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
      successPay: false,
      loadingPay: false,
    });
  //It uses the usePayPalScriptReducer hook to manage the state related to PayPal script loading.
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  //after successful payment
  function onApprove(data, actions) {
    //It captures the payment details once the user approves the payment on the PayPal platform. The result is a details object.
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        //It makes a PUT request to the server to update the order's payment status.
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        //If the PUT request is successful, it dispatches a 'PAY_SUCCESS' action with the received data as the payload.
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid!');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    // Function to fetch order details from the server

    const fetchOrder = async () => {
      try {
        //  Dispatching an action to indicate that a fetch request is in progress

        dispatch({ type: 'FETCH_REQUEST' });

        // Making a GET request to fetch order details from the server

        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        // Dispatching an action with fetched data on successful fetch
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        // Dispatching an action with error details on fetch failure
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    // Redirect to login page if user is not authenticated
    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        // Making a GET request to retrieve PayPal client ID
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        // Dispatching actions to reset PayPal options and set loading status
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    } //dependency array ,ensures that the effect is re-run whenever any of these dependencies change.
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox varaint="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId} </h1>
      <Row>
        <Col md={8}>
          <Card
            className="mb-3"
            style={{
              height: '272px',
              width: '660px',
              padding: '14px',
            }} // Added marginBottom
          >
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text style={{ marginTop: '19px' }}>
                <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address}{' '}
                <br />
                {order.shippingAddress.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card
            className="mb-3"
            style={{ height: '195px', width: '660px', padding: '14px' }}
          >
            <Card.Body>
              <Card.Title> Payment</Card.Title>
              <Card.Text style={{ marginTop: '19px' }}>
                <strong> Method: </strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox varaint="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card
            className="mb-3"
            style={{
              height: '390px',
              width: '660px',
              padding: '14px',
            }}
          >
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link
                          style={{
                            marginLeft: '10px',
                            maxWidth: '140px', // Set a maximum width to prevent stretching
                            whiteSpace: 'nowrap', // Prevent the text from wrapping to the next line
                            overflow: 'hidden', // Hide any overflowing text
                            textOverflow: 'ellipsis', // Display an ellipsis (...) for overflow
                          }}
                          to={`/product/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>AED {item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="mb-3"
            style={{
              height: '380px',
              width: '300px',
              padding: '5px',
            }}
          >
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>AED {order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>AED {order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>AED {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    <Col>AED {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
