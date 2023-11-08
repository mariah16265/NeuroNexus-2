import { createContext, useReducer } from 'react';
export const Store = createContext();
const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add to cart
      return {
        //keep all values in the field
        ...state,
        //but for cart obj
        cart: {
          //keep all prev values in cart object
          ...state.cart,
          //only update cart items
          //add new one that is action.payload
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  //value conatins current state and dispatch
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
