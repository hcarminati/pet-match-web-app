import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
                                  name: 'user',
                                  initialState,
                                  reducers: {
                                      setUser: (state, action) => {
                                          state.user = action.payload;
                                      },
                                      login: (state) => {
                                          state.isLoggedIn = true; // Set isLoggedIn to true when the user logs in
                                      },
                                      logout: (state) => {
                                          state.isLoggedIn = false; // Set isLoggedIn to false when the user logs out
                                      },
                                  },
                              });

export const { setUser, login, logout } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
