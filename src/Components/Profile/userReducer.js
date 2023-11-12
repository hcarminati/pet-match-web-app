import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn: false,
    userType: "guest",
};

const userSlice = createSlice({
                                  name: 'user',
                                  initialState,
                                  reducers: {
                                      setUser: (state, action) => {
                                          state.user = action.payload;
                                      },
                                      login: (state) => {
                                          state.isLoggedIn = true;
                                      },
                                      logout: (state) => {
                                          state.isLoggedIn = false;
                                          state.user = null; // Clear user data on logout
                                          state.userType = "guest"; // Reset user type
                                      },
                                  },
                              });

export const { setUser, login, logout } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserType = (state) => state.user.userType;

export default userSlice.reducer;
