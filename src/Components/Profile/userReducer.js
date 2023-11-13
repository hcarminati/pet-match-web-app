import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    password: null,
    isLoggedIn: false,
    userType: "guest",
    description: "",
};

const userSlice = createSlice({
                                  name: 'user',
                                  initialState,
                                  reducers: {
                                      setUser: (state, action) => {
                                          state.username = action.payload.username;
                                          state.description = action.payload.description;
                                      },
                                      login: (state, action) => {
                                          state.username = action.payload.username;
                                          state.password = action.payload.password;
                                          state.isLoggedIn = true;
                                      },
                                      logout: (state) => {
                                          state.isLoggedIn = false;
                                          state.username = null; // Clear user data on logout
                                          state.password = null;
                                          state.userType = "guest"; // Reset user type
                                      },
                                  },
                              });

export const { setUser, login, logout } = userSlice.actions;

export default userSlice.reducer;
