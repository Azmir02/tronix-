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

      case "REMOVE_CART":{
        const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id)
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
        
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: cartItems,
          },
        };
      }
     
      default:
        return state;
    }

}

//wishlist
const wishlistinitialState ={
    wishlist:{
        wishlistItems: localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : []
    }
}

function wishlistreducer(state, action) {
    switch (action.type) {
      case "ADD_WISHLIST":
        const newItem = action.payload
        const existingItem = state.wishlist.wishlistItems.find((item)=> item._id == newItem._id)
        const wishlistItems = existingItem ? state.wishlist.wishlistItems.map((item)=> item._id == existingItem._id ? newItem : item) : [...state.wishlist.wishlistItems, newItem]

        localStorage.setItem('wishlistItems',JSON.stringify(wishlistItems))

        return {
          ...state,
          wishlist: {
            ...state.wishlist,
            wishlistItems: wishlistItems,
          },
        };
      default:
        return state;
    }

}


//search
const searchinitialState ={
    searchmain: []
}

function searchreducer(state, action) {
    switch (action.type) {
      case "SEARCH_RESULT":
        return {
          ...state,
          searchmain: action.payload
        };
      default:
        return state;
    }

}


const Storeprovider = (props)=>{
  const [state, dispatch] = useReducer(reducer, initialState)
  const [state2, dispatch2] = useReducer(wishlistreducer, wishlistinitialState)
  const [state3, dispatch3] = useReducer(searchreducer, searchinitialState)
  let value = {state,dispatch,state2, dispatch2,state3, dispatch3}

  return <Store.Provider value = {value}>{props.children}</Store.Provider>

}


export {Storeprovider,Store}