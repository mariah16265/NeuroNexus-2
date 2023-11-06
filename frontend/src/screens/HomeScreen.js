import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products.map(
          (
            products //to embed JavaScript within JSX.
          ) => (
            <div className="product" key={products.slug}>
              <Link to={`/products/${products.slug}`}>
                <img
                  src={products.image}
                  width="679"
                  height="379"
                  alt={products.name}
                ></img>
              </Link>
              <div className="product-info">
                <Link to={`/products/${products.slug}`}>
                  <p>{products.name}</p>
                </Link>
                <p>
                  <strong>AED {products.price}</strong>
                </p>
                <button> Add to cart</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
