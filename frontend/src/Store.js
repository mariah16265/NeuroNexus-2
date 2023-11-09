import { createContext, useReducer } from 'react';
export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem('userInfo') // If local storage contains a value for "userInfo,"
    ? //parsing that JSON string to convert it back into a JavaScript array.
      JSON.parse(localStorage.getItem('userInfo'))
    : // If local storage doesn't contain "userInfo" or if there's an issue with parsing the JSON data, set to null
      null,
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? // If local storage contains a value for "cartItems,"
        //parsing that JSON string to convert it back into a JavaScript array.
        JSON.parse(localStorage.getItem('cartItems'))
      : // If local storage doesn't contain "cartItems" or if there's an issue with parsing the JSON data, an empty array [] is used as a fallback.
        [],
  },
};
//The reducer function is used to update the state based on dispatched actions.
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // reducer extracts the newItem from the action.payload. This is the item you want to add to the cart.
      const newItem = action.payload;
      //to check if the newItem already exists in the cartItems array. It does this by using the find method to search for an item in the cartItems array with the same _id as the newItem. If it finds a matching item, it will be stored in existItem. If not, existItem will be undefined.
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      //The cartItems array is updated based on whether the newItem already exists in the cart.
      //If existItem already exists, it maps through the existing cartItems array and replaces the item with the same _id with the newItem.
      //If existItem is doesn't exist, it adds the newItem to the cartItems array using the spread operator.
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      //JSON.stringify to convert cartItems to string and save them in 'cartItems'
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      //The return statement constructs a new state object. It uses the spread operator to clone the existing state object and then updates the cart property with a new object that has the updated cartItems.
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      //new array of cartItems is created, it is derived from the current state.cart.cartItems
      //to create a new array that includes only the items that do not match the condition
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // replaces the cartItems property with the new cartItems array.
      return { ...state, cart: { ...state.cart, cartItems } };
      //The result is a new state with the specified item removed from the shopping cart.
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  //value is an object with two properties: state and dispatch.
  const value = { state, dispatch };
  //The <Store.Provider> component is used to create a context provider for your application.
  //The context provider allows child components to access the state and dispatch functions.
  //value={value} sets the value of the context to the value object, which contains both state and dispatch.
  //{props.children} is a special React prop that represents the child elements of the StoreProvider. It allows you to wrap other components with the StoreProvider and provide them with access to the context.
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
//When you call dispatch, you're essentially telling React to update the state based on a specific
