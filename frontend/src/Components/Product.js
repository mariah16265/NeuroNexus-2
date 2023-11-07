import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { products } = props;
  return (
    <Card>
      <Link to={`/products/${products.slug}`}>
        <img
          src={products.image}
          className="card-img-top"
          width="679"
          height="329"
          alt={products.name}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/products/${products.slug}`}>
          <Card.Title>{products.name}</Card.Title>
        </Link>
        <Rating
          rating={products.rating}
          numReviews={products.numReviews}
        ></Rating>
        <Card.Text>AED {products.price}</Card.Text>
        <Button>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
