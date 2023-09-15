import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/features/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // location: LocationDevice,
    // productPortfolio: ProductPortfolioSlice,
    // product: ProductSlice,
    // cart: CartSlice,
    // wishList: wishListItemSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
