import { configureStore} from "@reduxjs/toolkit";
import productsReducer,{productsFetching} from "../features/products/productSlice"
import cartReducer from "../features/products/cartSlice"
import authReducer from "../features/auth/authSlice"
import walletReducer from "../features/wallet/walletSlice"

export  const store= configureStore({
    reducer:{
        products:productsReducer,
        cart: cartReducer,
        auth: authReducer,
        wallet: walletReducer
    }
})

store.dispatch(productsFetching())