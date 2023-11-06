import { Link, useParams } from 'react-router-dom';
// import data from '../data';
import { useEffect, useState } from 'react';
import axios from 'axios';
function HomeScreen() {
  const [products, setProducts] = useState([]);
  //useEffect is an asynchronous function, responsible for fetching data from an API.
  useEffect(() => {
    //This is an asynchronous function called fetchData that contains the logic for making an API request.
    //It uses the axios library to send a GET request to the /api/products endpoint. The result of the request is stored in the result variable.
    const fetchData = async () => {
      //The await keyword is used to wait for the response from the API before continuing execution. The response is stored in the result variable.
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map(
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
