import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Rating from '../Components/Rating';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { getError } from '../util';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      //keep prev states value, only change loading to true
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      //action.payload:contains products from backend
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  //useEffect is an asynchronous function, responsible for fetching data from an API.
  useEffect(() => {
    //This is an asynchronous function called fetchData that contains the logic for making an API request.
    //It uses the axios library to send a GET request to the /api/products endpoint. The result of the request is stored in the result variable.
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        //The await keyword is used to wait for the response from the API before continuing execution. The response is stored in the result variable.
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
    // When slug changes (e.g., when a user navigates to a different product page with a different slug), the effect is re-executed.
  }, [slug]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    //<Col md={6}> occupies half of the screen (6/12) for the image
    //<Col md={3}> occupies 3/12 share for product info
    //<Col md={3}> occupies 3/12 ,width = product info
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={products.image}
            alt={products.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{products.name}</title>
              </Helmet>
              <h1>{products.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating>
                rating={products.rating}
                numReviews={products.numReviews}
              </Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: AED {products.price}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>${products.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {products.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {products.countInStock > 0 && ( //d-grid:button will be full width
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;
