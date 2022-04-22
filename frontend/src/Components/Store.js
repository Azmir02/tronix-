import { createContext, useReducer } from "react";


const Store = createContext()

const initialState ={
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}

function reducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        const newItem = action.payload
        const existingItem = state.cart.cartItems.find((item)=> item._id == newItem._id)
        const cartItems = existingItem ? state.cart.cartItems.map((item)=> item._id == existingItem._id ? newItem : item) : [...state.cart.cartItems, newItem]

        localStorage.setItem('cartItems',JSON.stringify(cartItems))

        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: cartItems,
          },
        };
      default:
        return state;
    }

}


const Storeprovider = (props)=>{
  const [state, dispatch] = useReducer(reducer, initialState)
  let value = {state,dispatch}

  return <Store.Provider value = {value}>{props.children}</Store.Provider>

}


export {Storeprovider,Store}