import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
//JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.
function App() {
  return (
    //React Router DOM makes it easy to create single-page applications (SPAs) with multiple views or pages,
    //each represented by a unique URL. This helps improve the user experience by allowing users to navigate between different sections of the application
    //without requiring a full page refresh.
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">amazon</Link>
        </header>
        <main>
          <Routes>
            <Route path="/products/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
