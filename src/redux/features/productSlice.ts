import { createSlice } from "@reduxjs/toolkit";
const {products, cartItems} =  require('@/app/lib/products-data')

const initialState = {
        products,
        productSelected: products[0],
        cart: cartItems
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        select: (state, action) => {
            state.productSelected = action.payload
        },
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        addToCart: (state, action) => {        
            let addedProductIndex = state.cart.findIndex(
              (product: { id: any; }) => product.id === action.payload.id
            );
            let compareProductIndex = state.products.findIndex(
                (product: { id: any; }) => product.id === action.payload.id
              );
            if (addedProductIndex !== -1) {
              let newCart = [...state.cart];
              newCart[addedProductIndex] = {
                ...newCart[addedProductIndex],
                quantity: newCart[addedProductIndex].quantity + 1,
              };
              if(newCart[addedProductIndex].quantity >= state.products[compareProductIndex].quantity){
                newCart[addedProductIndex].quantity = state.products[compareProductIndex].quantity
              }
              return {
                ...state,
                cart: newCart,
              };
            } else {
              let newProduct = {...action.payload}
              newProduct.quantity = 1;
              return {
                ...state,
                cart: [...state.cart, newProduct],
              };
            }
        },
        removeFromCart: (state, action) => {
            let addedProductIndex = state.cart.findIndex(
              (product: { id: any; }) => product.id === action.payload.id
            );
            if (addedProductIndex !== -1 && action.payload.quantity > 1) {
              let newCart = [...state.cart];
              newCart[addedProductIndex] = {
                ...newCart[addedProductIndex],
                quantity: newCart[addedProductIndex].quantity - 1,
              };
              return {
                ...state,
                cart: newCart,
              };
            } else if (state.cart[addedProductIndex].quantity === 1) {
              let newCart = [...state.cart];
              newCart.splice(addedProductIndex, 1);
              return {
                ...state,
                cart: newCart,
              };
            }
          },
        quitFromCart: (state, action) => {
            let addedProductIndex = state.cart.findIndex(
                (product: { id: any; }) => product.id === action.payload.id
              );
            let newCart = [...state.cart];
              newCart.splice(addedProductIndex, 1);
              return {
                ...state,
                cart: newCart,
              };
        }
          
    }
})

export const {select, addProduct, addToCart, removeFromCart, quitFromCart} = productSlice.actions
export default productSlice.reducer