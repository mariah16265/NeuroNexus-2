import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { products } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // if (!products) {
  //   return null;
  // }
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    //check if current product exists in the cart,
    const existItem = cartItems.find((x) => x._id === products._id);
    //if it does, increase quantity by one, else set it to 1
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Out Of Stock!');
      return;
    }
    //dispatch action on react context
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/products/${products.slug}`}>
        <img
          src={products.image}
          className="card-img-top"
          width="149"
          height="259"
          alt={products.name}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/products/${products.slug}`}>
          <Card.Title>{products.name}</Card.Title>
        </Link>
        <Rating rating={products.rating} numReviews={products.numReviews} />
        <Card.Text>AED {products.price}</Card.Text>
        {products.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(products)}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
