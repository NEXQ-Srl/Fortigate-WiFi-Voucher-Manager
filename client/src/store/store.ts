import { configureStore } from '@reduxjs/toolkit';
import { firewallReducer } from './firewallSlice'; // Import the firewall reducer

// Configure the Redux store
const store = configureStore({
  reducer: {
    firewall: firewallReducer, // Add the firewall reducer to the store
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>; // Type for the root state
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function

export default store;
