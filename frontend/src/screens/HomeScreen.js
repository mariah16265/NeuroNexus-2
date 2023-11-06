import { Link, useParams } from 'react-router-dom';
// import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
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
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
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
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 id="heading">Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map(
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
          )
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
