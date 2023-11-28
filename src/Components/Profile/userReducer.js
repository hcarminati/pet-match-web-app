import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    username: null,
    password: null,
    isLoggedIn: false,
    role: 'GUEST',
    description: '',
    likes: [],
};

const userSlice = createSlice({
                                  name: 'user',
                                  initialState,
                                  reducers: {
                                      setUser: (state, action) => {
                                          state.username = action.payload.username;
                                          state.email = action.payload.email;
                                          state.description = action.payload.description;
                                          state.role = action.payload.role;
                                      },
                                      login: (state, action) => {
                                          state.email = action.payload.email;
                                          state.username = action.payload.username;
                                          state.password = action.payload.password;
                                          state.role = action.payload.role;
                                          state.description = action.payload.description;
                                          state.isLoggedIn = true;
                                      },
                                      logout: (state) => {
                                          state.isLoggedIn = false;
                                          state.email = null;
                                          state.username = null; // Clear user data on logout
                                          state.password = null;
                                          state.role = 'guest'; // Reset user type
                                      },
                                      changePassword: (state, action) => {
                                          if (action.payload.currentPassword !== state.password) {
                                              console.error('Current password is incorrect');
                                              return;
                                          }
                                          state.password = action.payload.newPassword;
                                      },
                                  },
                              });

export const { setUser, login, logout, changePassword } = userSlice.actions;

export default userSlice.reducer;
