import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Firewall } from '@/types/Firewall';

// Initial state for the firewall slice
const initialState: { selectedFirewall: Firewall | null } = {
  selectedFirewall: localStorage.getItem("selectedFirewall") ? JSON.parse(localStorage.getItem("selectedFirewall")!) : null,
};

// Redux slice for managing firewall-related state
const firewallSlice = createSlice({
  name: 'firewall', // Name of the slice
  initialState,
  reducers: {
    // Action to set the selected firewall
    setSelectedFirewall: (state, action: PayloadAction<Firewall>) => {
      state.selectedFirewall = action.payload;
      //console.log("Selected firewall:", action.payload);
      localStorage.setItem("selectedFirewall", JSON.stringify(action.payload));
    },
  },
});

// Export the actions
export const { setSelectedFirewall } = firewallSlice.actions;

// Export the reducer for the store
export const firewallReducer = firewallSlice.reducer;