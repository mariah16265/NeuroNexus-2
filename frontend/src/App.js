import data from './data';
//JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.
function App() {
  return (
    <div>
      <header>
        <a href="/">amazon</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map(
            (
              products //to embed JavaScript within JSX.
            ) => (
              <div className="product" key={products.slug}>
                <a href={`/products/${products.slug}`}>
                  <img
                    src={products.image}
                    width="679"
                    height="379"
                    alt={products.name}
                  ></img>
                </a>
                <div className="product-info">
                  <a href={`/products/${products.slug}`}>
                    <p>{products.name}</p>
                  </a>
                  <p>
                    <strong>AED {products.price}</strong>
                  </p>
                  <button> Add to cart</button>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
